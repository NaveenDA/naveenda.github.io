# html-linter
A simple linter to check the formatting of the html files in your project  
Designed to be similar to how tslint and sass-lint work unlike other html linters which load urls and check the validity of the html page

![example](https://chinchiheather.github.io/html-linter/img/example.png)

## Setup
Install globally to run from the command line:
```bash
# npm
npm install --global html-linter
# yarn
yarn global add html-linter
```

Install locally to run using an npm script:
```bash
# npm
npm install --save-dev html-linter
#  yarn
yarn add --dev html-linter
```

Create a json configuration file

## Configuration
You need to pass in a json configuration file that specifies the rules you want to enforce  
Any properties not present in this file will not be checked  
See the [example config file](https://github.com/chinchiheather/html-linter/blob/master/html-linter.json)  

```js
files: string[];                      // array of files to check, can use glob patterns
indentation: {
  char: 'space' | 'tab';              // character indentation should use
  number: number;                     // number of indentation characters file should use
};
attributes: {
  quotes: 'single' | 'double';        // quote character that attribute values should use
  whitespace: number;                 // number of whitespace characters there should be around the '=' character
  vertical-align: boolean;            // whether attributes should align vertically
};
```

## Usage
```bash
html-linter --config [config filepath] [files]
```

The `--config` flag is **required** and should be the path to the json configuration file for html-linter

The file list is optional and can be used to override the files property in the config file

### Example

```bash
html-linter --config ./html-linter.json src/**/*.html




