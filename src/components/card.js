import  React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bg};
`;
const Card = (props) => {
  return <Wrapper>Hello world</Wrapper>;
};
export default Card;
