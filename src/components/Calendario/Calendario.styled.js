import styled from "styled-components";

export const Wrapper = styled.div`
  height: 50vh;
  width: 50vw;
  margin-top: 20vh;
  margin-bottom: 25vh;
  margin-left: auto;
  margin-right: auto;
`;

export const StyledEvent = styled.span`
  background: ${({ bgColor }) => bgColor};
  color: white;
  text-align: left !important;
  padding: 2px 10px;
  margin: 0 2px;
  border-radius: 10px;
  font-size: 13px;
  cursor: move;
  text-transform: capitalize;
`;

export const SevenColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  ${(props) => props.fullheight && `height: calc(100% - 75px);`}
  ${(props) =>
    props.fullheight &&
    `grid-template-rows: repeat(${props.is28Days ? 4 : 5}, 1fr);`}
  div {
    display: grid;
    border: 1px solid;
    ${StyledEvent} {
      display: none;
    }
    ${StyledEvent}:nth-child(-n + 3) {
      display: block;
    }

    span {
      text-align: right;
      padding-right: 15px;
      height: fit-content;
    }

    span.active {
      background-color: pink;
      border-bottom: 2px solid red;
      position: relative;
    }
    span.active::before {
      content: "Hoy ";
      font-size: 14px;
    }
  }
`;

export const HeadDays = styled.span`
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-weight: bolder;
  font-size: 20px;
  height: 30px;
  padding: 5px;
  background: orange;
  color: white;
`;

export const DateControls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  align-items: center;
  border: 3px solid black;
  font-weight: bolder;
  text-transform: uppercase;

  ion-icon {
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

export const SeeMore = styled.p`
  font-size: 12px;
  padding: 0 5px;
  margin-bottom: 0;
  cursor: pointer;
`;

export const PortalWrapper = styled.div`
  background: white;
  position: absolute;
  width: 35%;
  height: 200px;
  top: 50%;
  left: 50%;
  /* border: 1px solid; */
  border-radius: 6px;
  transform: translate(-50%, -50%);
  box-shadow: 10px 10px 20px black;
  padding: 30px 20px;

  h2 {
    font-size: 3rem;
  }

  ion-icon {
    font-size: 2rem;
    color: white;
    background: red;
    padding: 10px 20px;
    border-radius: 6px;
    position: absolute;
    bottom: 10px;
  }

  p {
    margin-bottom: 15px;
  }

  ion-icon[name="close-outline"] {
    position: absolute;
    top: 10px;
    right: 10px;
    background: red;
    color: white;
    cursor: pointer;
    font-size: 15px;
    padding: 5px 10px;
    display: inline-block;
    font-weigth: bolder;
    bottom: auto;
  }
`;
