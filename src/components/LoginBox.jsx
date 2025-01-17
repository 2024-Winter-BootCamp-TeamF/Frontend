import { useState } from "react";
import styled from "styled-components";
import LoginToggle from "./LoginToggle.jsx";
import LoginInputForm from "./LoginInputForm.jsx";
import character from "../images/character.png";

const LoginBox = () => {
  const [currentType, setCurrentType] = useState("SignIn");
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  // currentType 변경 시 입력 값 초기화
  const handleTypeChange = (newType) => {
    setCurrentType(newType);
    setInputValues({
      username: "",
      password: "",
      name: "",
      confirmPassword: "",
    });
  };

  return (
    <LoginBoxWrapper>
      <ContentsWrapper>
        <CharacterSection>
          <CharacterWrapper>
            <img src={character} alt="character" />
          </CharacterWrapper>
          <LoginToggle
            currentType={currentType}
            setCurrentType={handleTypeChange}
          />
        </CharacterSection>
        <LoginInputForm
          currentType={currentType}
          inputValues={inputValues}
          setInputValues={setInputValues}
          setCurrentType={setCurrentType}
        />
      </ContentsWrapper>
    </LoginBoxWrapper>
  );
};



const CharacterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CharacterWrapper = styled.div`
  width: 150px;
  height: 170px;
  border: 1px solid #5887f4;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 190px;
    position: relative;
    bottom: -20px;
    left: 5px;
  }
`;

const LoginBoxWrapper = styled.div`
  min-width: 600px;
  min-height: 300px;
  height: auto;
  background: white;
  border: 2px solid #5887f4;
  border-radius: 10px;
  padding: 45px 45px 20px 45px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  gap: 45px;
`;

export default LoginBox;
