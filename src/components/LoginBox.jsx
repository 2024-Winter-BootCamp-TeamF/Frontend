import { useState } from "react";
import styled from "styled-components";
import user from "../images/user.png";
import footer from "../images/footer.png";
import LoginToggle from "./LoginToggle.jsx";

const LoginBox = () => {
  const [currentType, setCurrentType] = useState("SignIn");

  return (
    <LoginBoxWrapper>
      <ContentsWrapper>
        <LoginToggle
          currentType={currentType}
          setCurrentType={setCurrentType}
        />
        <IconSection>
          <img src={user} alt="user" />
        </IconSection>
        <InputForm currentType={currentType} />
        <ButtonSection />
      </ContentsWrapper>
      <BottomImageSection>
        <img src={footer} alt="footer" />
      </BottomImageSection>
    </LoginBoxWrapper>
  );
};

const LoginBoxWrapper = styled.div`
  width: 450px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  border-radius: 15px;
  overflow: hidden; /* 박스 밖으로 콘텐츠가 삐져나오지 않게 처리 */
  position: relative;
`;

const ContentsWrapper = styled.div`
    padding: 40px;
`

const IconSection = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`;
const InputForm = styled.div``;
const ButtonSection = styled.div``;

const TypeSection = styled.div``;

const BottomImageSection = styled.div`
  position: absolute; /* 로그인 박스 안에서 위치를 자유롭게 조정 가능 */
  bottom: 0; /* 로그인 박스의 하단에 이미지 고정 */
  width: 100%;
  height: auto; /* 이미지 비율 유지 */
  z-index: -1; /* 이미지가 가장 아래쪽으로 배치되도록 설정 */

  img {
    width: 1560px; /* 박스의 너비에 맞게 이미지 설정 */ /* 박스 안에 꽉 차도록 이미지 설정 */
    height: auto; /* 비율 유지 */
  }
`;
export default LoginBox;
