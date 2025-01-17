import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginInputForm = ({
  currentType,
  inputValues,
  setInputValues,
  setCurrentType,
}) => {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentType === "SignUp") {
      // 입력값 확인
      if (
        !inputValues.name ||
        !inputValues.password ||
        !inputValues.confirmPassword
      ) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // 비밀번호 확인
      if (inputValues.password !== inputValues.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 기존 사용자 확인
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((user) => user.name === inputValues.name)) {
        alert("이미 존재하는 이름입니다.");
        return;
      }

      // 새 사용자 저장
      users.push({
        name: inputValues.name,
        password: inputValues.password,
      });
      localStorage.setItem("users", JSON.stringify(users));
      alert("회원가입이 완료되었습니다!");

      // 입력값 초기화 후 로그인 화면으로 전환
      setInputValues({
        name: "",
        password: "",
        confirmPassword: "",
      });
      setCurrentType("SignIn");
    } else {
      // 로그인 입력값 확인
      if (!inputValues.name || !inputValues.password) {
        alert("이름과 비밀번호를 모두 입력해주세요.");
        return;
      }

      // 로그인 처리
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (user) =>
          user.name === inputValues.name &&
          user.password === inputValues.password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("로그인 성공!");
        navigate("/userpage");
      } else {
        alert("이름 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <InputFormWrapper>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={inputValues.name}
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
