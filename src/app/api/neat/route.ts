import { NextRequest, NextResponse } from 'next/server';
import { Neat, Methods, architect } from 'neataptic';

// In-memory NEAT state (will reset on server restart)
let neat: Neat | null = null;
let populationSize = 50;
let inputSize = 3;
let outputSize = 2;
let generation = 1;

function getOrCreateNeat() {
  if (!neat) {
    neat = new Neat(
      inputSize,
      outputSize,
      null,
      {
        mutation: Methods.mutation.ALL,
        popsize: populationSize,
        elitism: Math.round(0.1 * populationSize),
        network: new architect.Perceptron(inputSize, 6, outputSize),
      }
    );
  }
  return neat;
}

export async function GET() {
  const neat = getOrCreateNeat();
  // Return population as array of weights
  const population = neat.population.map((network) => network.toJSON());
  return NextResponse.json({
    population,
    generation,
    populationSize,
    inputSize,
    outputSize,
  });
}

export async function POST(req: NextRequest) {
  const neat = getOrCreateNeat();
  const { type } = await req.json();

  if (type === 'fitness') {
    // Set fitness for each network
    const { fitness } = await req.json(); // array of fitness values
    fitness.forEach((fit: number, i: number) => {
      neat.population[i].score = fit;
    });
    return NextResponse.json({ status: 'ok' });
  }

  if (type === 'advance') {
    // Evolve to next generation
    await neat.evolve();
    generation++;
    const population = neat.population.map((network) => network.toJSON());
    return NextResponse.json({
      population,
      generation,
      populationSize,
      inputSize,
      outputSize,
    });
  }

  if (type === 'setPopulation') {
    const { newSize } = await req.json();
    populationSize = newSize;
    neat.population = [];
    neat.popsize = newSize;
    neat.elitism = Math.round(0.1 * newSize);
    neat.createPool();
    return NextResponse.json({ status: 'ok' });
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
} 