import { useState } from "react";
import styled from "styled-components";
import user from "../images/login_user.png";
import footer from "../images/footer.png";
import LoginToggle from "./LoginToggle.jsx";
import LoginInputForm from "./LoginInputForm.jsx";

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
        <LoginToggle
          currentType={currentType}
          setCurrentType={handleTypeChange}
        />
        <IconSection>
          <img src={user} alt="user" />
        </IconSection>
        <LoginInputForm
          currentType={currentType}
          inputValues={inputValues}
          setInputValues={setInputValues}
        />
      </ContentsWrapper>
      <BottomImageSection>
        <img src={footer} alt="footer" />
      </BottomImageSection>
    </LoginBoxWrapper>
  );
};

const LoginBoxWrapper = styled.div`
  min-width: 200px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
`;

const ContentsWrapper = styled.div`
  padding: 20px 15px 15px 15px;
`;

const IconSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const BottomImageSection = styled.div`
  display: flex;
  justify-content: center;
  position: absolute; /* 로그인 박스 안에서 위치를 자유롭게 조정 가능 */
  bottom: 0; /* 로그인 박스의 하단에 이미지 고정 */
  width: 100%;
  height: 50px;
  z-index: -1; /* 이미지가 가장 아래쪽으로 배치되도록 설정 */
  img {
    width: 1560px; /* 박스의 너비에 맞게 이미지 설정 */ /* 박스 안에 꽉 차도록 이미지 설정 */
    height: auto; /* 비율 유지 */
  }
`;

export default LoginBox;
