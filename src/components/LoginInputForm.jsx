import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginInputForm = ({
  currentType,
  inputValues,
  setInputValues,
  setCurrentType,
}) => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api/user";
  const [showModal, setShowModal] = useState(false);

  // 회원가입 API 호출
  const signUp = async (userData) => {
    try {
      const signUpData = {
        username: userData.id,
        password: userData.password,
      };

      const response = await axios.post(`${API_BASE_URL}/signup`, signUpData);
      if (response.status === 201) {
        setShowModal(true);
        return true;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.username) {
          alert("이미 존재하는 아이디입니다.");
        } else if (error.response.data.password) {
          alert(error.response.data.password[0]);
        } else if (error.response.data.error) {
          alert(error.response.data.error);
        } else {
          alert("회원가입 중 오류가 발생했습니다.");
        }
      } else {
        alert("서버와의 연결이 실패했습니다.");
      }
      return false;
    }
  };

  // 로그인 API 호출
  const signIn = async (userData) => {
    try {
      const signInData = {
        username: userData.id,
        password: userData.password,
      };

      const response = await axios.post(`${API_BASE_URL}/login`, signInData);
      if (response.status === 200) {
        const token = response.data.token;
        const username = signInData.username;

        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");

        navigate(`/mypage/summary`);
        return true;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.error) {
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (error.response.data.username) {
          alert(error.response.data.username[0]);
        } else if (error.response.data.password) {
          alert(error.response.data.password[0]);
        } else {
          alert("로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("서버와의 연결이 실패했습니다.");
      }
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      id: inputValues.id,
      password: inputValues.password,
    };

    if (currentType === "SignUp") {
      await signUp(userData);
    } else {
      await signIn(userData);
    }
  };

  return (
    <InputFormWrapper>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputGroup>
            <Label>아이디</Label>
            <Input
              type="text"
              name="id"
              placeholder="Id"
              value={inputValues.id}
              onChange={handleInputChange}
            />
          </InputGroup>
          <InputGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={inputValues.password}
              onChange={handleInputChange}
            />
          </InputGroup>
          {currentType === "SignUp" && (
            <InputGroup>
              <Label>비밀번호 확인</Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={inputValues.confirmPassword}
                onChange={handleInputChange}
              />
            </InputGroup>
          )}
        </InputWrapper>
        <SubmitButtonWrapper>
          <SubmitButton type="submit">
            {currentType === "SignIn" ? "로그인하기!" : "회원가입하기!"}
          </SubmitButton>
        </SubmitButtonWrapper>
      </form>
      {showModal && (
        <Modal>
          <ModalContentWrapper>
            <ModalContent>
              <p>회원가입이 완료되었습니다!</p>
              <ModalButton
                onClick={() => {
                  setShowModal(false);
                  setCurrentType("SignIn");
                  setInputValues({ id: "", password: "", confirmPassword: "" });
                }}
              >
                로그인하러 가기
              </ModalButton>
            </ModalContent>
          </ModalContentWrapper>
        </Modal>
      )}
    </InputFormWrapper>
  );
};

const InputFormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 3px;

  form {
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  margin-left: 2px;
`;

const Input = styled.input`
  background: #f0f0f0;
  width: 100%;
  height: 50px;
  padding: 12px 15px;
  border: none;
  border-radius: 10px;
  outline: none;
  font-size: 14px;

  &:focus {
    background: #fff;
    border-bottom: 1px solid #004dff; /* 하단 파란색 보더 */
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25); /* 드롭 섀도우 효과 */
  }

  &::placeholder {
    color: #999;
  }
`;

const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
`;

const SubmitButton = styled.button`
  width: 150px;
  font-size: 18px;
  color: #fff;
  background-color: #004dff;
  border: 1px solid #004dff;
  border-radius: 5px;
  padding: 12px 20px 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  font-weight: 500;
  font-family: "HakgyoansimAllimjangTTF-R";

  &:hover {
    background-color: #fff;
    color: #004dff;
    border: 1px solid #004dff;
  }

  &:active {
    background-color: #004dff;
    color: #fff;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContentWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    font-size: 24px;
  }
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background: #5887f4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
  border: 1px solid #5887f4;
  font-size: 16px;
  font-weight: 500;
  font-family: "HakgyoansimAllimjangTTF-R";

  &:hover {
    background-color: #fff;
    color: #5887f4;
    border: 1px solid #5887f4;
  }
`;

export default LoginInputForm;
