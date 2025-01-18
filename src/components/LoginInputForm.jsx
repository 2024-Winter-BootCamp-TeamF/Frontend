import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginInputForm = ({
  currentType,
  inputValues,
  setInputValues,
  setCurrentType,
}) => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000/api/user";

  // 회원가입 API 호출
  const signUp = async (userData) => {
    try {
      const signUpData = {
        username: userData.id,
        password: userData.password,
      };

      const response = await axios.post(`${API_BASE_URL}/signup/`, signUpData);
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다!");
        setCurrentType("SignIn");
        setInputValues({
          id: "",
          password: "",
          confirmPassword: "",
        });
        return true;
      }
    } catch (error) {
      if (error.response?.status === 409) {
        alert("이미 존재하는 아이디입니다.");
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
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

      const response = await axios.post(`${API_BASE_URL}/login/`, signInData);
      if (response.status === 200) {
        const token = response.data.key;
        const username = signInData.username;

        // localStorage에 필요한 정보 저장
        localStorage.setItem("accessToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");

        // 유저별 페이지로 리다이렉트
        navigate(`/users/${username}/summary`);
        return true;
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
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
      const success = await signUp(userData);
      if (success) {
        setInputValues({
          id: "",
          password: "",
          confirmPassword: "",
        });
      }
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

export default LoginInputForm;
