import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExButton from "../components/SampleButton";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import characater from "../images/character.png";

const UploadPage = () => {
  const [lectureFiles, setLectureFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showFileCountModal, setShowFileCountModal] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const [topics, setTopics] = useState([""]);
  const navigate = useNavigate();

  const onLectureDrop = useCallback((acceptedFiles) => {
    setLectureFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeLectureFile = (fileName) => {
    setLectureFiles(lectureFiles.filter((file) => file.name !== fileName));
  };

  const handleTopicsNext = () => {
    localStorage.setItem(
      "topics",
      JSON.stringify(topics.filter((topic) => topic.trim() !== ""))
    );

    navigate(`/sample`, { state: { topics } });
  };

  const {
    getRootProps: getLectureRootProps,
    getInputProps: getLectureInputProps,
    isDragActive: isLectureDragActive,
  } = useDropzone({ onDrop: onLectureDrop });

  const handleAddTopic = () => {
    if (topics.length < 3) {
      setTopics((prev) => [...prev, ""]);
    }
  };

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleUpload = async () => {
    if (lectureFiles.length === 0) {
      alert("강의 자료를 업로드해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      lectureFiles.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axiosInstance.request({
        method: "POST",
        url: "/pdf/upload",
        data: formData,
      });
      console.log(response.data);

      setFileCount(lectureFiles.length); // 업로드한 파일 개수 설정
      setShowFileCountModal(true); // 파일 개수 확인 모달 띄우기
    } catch (error) {
      if (error.response) {
        console.error(
          "Server Error:",
          error.response.status,
          error.response.data
        );
        alert(`서버 오류: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        console.error("No Response from Server:", error.request);
        alert("서버로부터 응답이 없습니다.");
      } else {
        console.error("Axios Configuration Error:", error.message);
        alert(`Axios 설정 오류: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmFileCount = async () => {
    const token = localStorage.getItem("accessToken"); // 인증 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const response = await axiosInstance.request({
        method: "POST",
        url: "/pinecone/upload",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API 호출 성공:", response.data);
      setShowFileCountModal(false); // 파일 개수 모달 숨기기
      setShowModal(true); // 토픽 입력 모달 띄우기
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setShowFileCountModal(false);
    }
  };

  return (
    <Container>
      <Header />
      <MainContentWrapper>
        <TitleSection>
          <MainTitle>
            PDF를 업로드하고 요약된 강의자료로 학습해보세요!
          </MainTitle>
          <SubTitle>연습 문제를 만들어서 실전 대비까지!</SubTitle>
        </TitleSection>

        <UploadSection>
          <UploadBox {...getLectureRootProps()}>
            <input {...getLectureInputProps()} multiple />
            <UploadTitle>강의 자료 업로드</UploadTitle>
            <UploadSubtitle>
              {isLectureDragActive
                ? "파일을 여기에 놓으세요"
                : "또는 드래그해서 파일 올리기"}
            </UploadSubtitle>
            {lectureFiles.length > 0 && (
              <FileList>
                {lectureFiles.map((file, index) => (
                  <FileItem key={`lecture-${file.name}-${index}`}>
                    <FileName>{file.name}</FileName>
                    <RemoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeLectureFile(file.name);
                      }}
                    >
                      ×
                    </RemoveButton>
                  </FileItem>
                ))}
              </FileList>
            )}
            <InstructionSection>
              <InstructionList>
                <li>
                  요약하고 싶은, 혹은 연습 문제를 만들고 싶은 강의자료를 왼쪽에
                  업로드해주세요.
                </li>
                <li>연습문제는 강의요약 이후 생성할 수 있습니다.</li>
              </InstructionList>
            </InstructionSection>
          </UploadBox>
        </UploadSection>

        <ButtonSection>
          <ExButton variant="filled" onClick={handleUpload}>
            파일 업로드
          </ExButton>
        </ButtonSection>

        {isLoading && (
          <LoadingModal>
            <LoadingContent>
              <LoadingSpinner />
              <LoadingText>파일을 처리하고 있습니다...</LoadingText>
            </LoadingContent>
          </LoadingModal>
        )}

        {showFileCountModal && (
          <Modal>
            <FileModalContent>
              <CharacterSection>
                <img src={characater} alt="character" />
              </CharacterSection>
              <p>{fileCount}개 파일 업로드 성공!</p>
              <ExButton variant="filled" onClick={handleConfirmFileCount}>
                확인
              </ExButton>
            </FileModalContent>
          </Modal>
        )}

        {showModal && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                <p>원하는 주제로 연습문제를 만들어 보세요!</p>
              </div>
              {topics.map((topic, index) => (
                <InputWrapper key={index}>
                  <label htmlFor={`topic_${index}`}>Topic {index + 1}</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <StyledInput
                      type="text"
                      id={`topic_${index}`}
                      value={topic}
                      onChange={(e) => handleTopicChange(index, e.target.value)}
                      style={{ width: index === 0 ? "auto" : "100%" }}
                    />
                    {index === 0 && (
                      <StyledButton onClick={handleAddTopic}>
                        추가하기
                      </StyledButton>
                    )}
                  </div>
                </InputWrapper>
              ))}
              <ButtonContainer>
                <StyledExButton
                  onClick={() => {
                    handleTopicsNext();
                    setShowModal(false);
                    navigate("/sample", {
                      state: {
                        pdfFile: lectureFiles[0],
                        topics: topics.filter((topic) => topic.trim() !== ""),
                      },
                    });
                  }}
                >
                  요약본 생성하기
                </StyledExButton>
              </ButtonContainer>
            </ModalContent>
          </Modal>
        )}
      </MainContentWrapper>

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const MainContentWrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleSection = styled.div`
  text-align: center;
  margin: px 0;
`;

const MainTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #666;
  font-weight: 500;
  margin-bottom: 10px;
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 25px;
`;

const UploadBox = styled.div`
  width: 600px;
  height: 400px;
  border: 2px dashed #5c85ff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #5887f4;
    background-color: #f8f9ff;
  }
`;

const UploadTitle = styled.h3`
  font-size: 24px;
  color: #5887f4;
  margin-bottom: 10px;
`;

const UploadSubtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

const FileList = styled.div`
  margin-top: 20px;
  width: 90%;
  max-height: 180px;
  overflow-y: auto;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 4px 0;
  background-color: #f8f9ff;
  border-radius: 4px;
  font-size: 14px;
`;

const FileName = styled.span`
  color: #5887f4;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #f24822;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;

  &:hover {
    color: #ff3333;
  }
`;

const InstructionSection = styled.div`
  margin-top: 40px;
`;

const InstructionList = styled.ul`
  font-size: 15px;
  list-style-type: none;
  text-align: center;

  li {
    color: #666;
    line-height: 30px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  position: relative;
  min-width: 300px;
`;

const FileModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  font-size: 28px;
  gap: 30px;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
`;

const CharacterSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 40%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; // spinner와 텍스트 사이 간격
`;

const LoadingModal = styled(Modal)`
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #5887f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 24px;
  margin: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 10px;
  label {
    font-size: 18px;
    color: #333;
    margin-bottom: 5px;
    text-align: left;
  }

  input {
    width: 200px;
    padding: 10px;
    border: 1px solid #5887f4;
    border-radius: 5px;
  }
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #5887f4;
  border-radius: 5px;
  width: 100%;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #5887f4;
  border-radius: 5px;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: #5887f4;
  color: white;
  border-radius: 5px;
  border: 2px solid #5887f4;

  padding: 8px 13px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 30px;
  font-family: "HakgyoansimAllimjangTTF-R";

  &:hover {
    background-color: #fff;
    color: #5887f4;
    border: 2px solid #5887f4;
  }
`;

const StyledExButton = styled.button`
  background-color: #5887f4;
  border: 2px solid #5887f4;
  color: white;
  border-radius: 5px;
  padding: 13px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  font-family: "HakgyoansimAllimjangTTF-R";
  font-size: 18px;

  &:hover {
    background-color: #fff;
    color: #5887f4;
    border: 2px solid #5887f4;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export default UploadPage;
