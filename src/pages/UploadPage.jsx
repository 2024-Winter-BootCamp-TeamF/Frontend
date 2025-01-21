import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExButton from "../components/SampleButton";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPage = () => {
  const [lectureFiles, setLectureFiles] = useState([]);
  const [problemFiles, setProblemFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onLectureDrop = useCallback((acceptedFiles) => {
    setLectureFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const onProblemDrop = useCallback((acceptedFiles) => {
    setProblemFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const removeLectureFile = (fileName) => {
    setLectureFiles(lectureFiles.filter((file) => file.name !== fileName));
  };

  const removeProblemFile = (fileName) => {
    setProblemFiles(problemFiles.filter((file) => file.name !== fileName));
  };

  const {
    getRootProps: getLectureRootProps,
    getInputProps: getLectureInputProps,
    isDragActive: isLectureDragActive,
  } = useDropzone({ onDrop: onLectureDrop });

  const {
    getRootProps: getProblemRootProps,
    getInputProps: getProblemInputProps,
    isDragActive: isProblemDragActive,
  } = useDropzone({ onDrop: onProblemDrop });

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

      const response = await axios.request({
        method: "POST",
        url: "http://localhost:8000/api/pdf/upload/",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      setShowModal(true);
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
          </UploadBox>

          <UploadBox {...getProblemRootProps()}>
            <input {...getProblemInputProps()} multiple />
            <UploadTitle>문제 유형 업로드</UploadTitle>
            <UploadSubtitle>
              {isProblemDragActive
                ? "파일을 여기에 놓으세요"
                : "또는 드래그해서 파일 올리기"}
            </UploadSubtitle>
            {problemFiles.length > 0 && (
              <FileList>
                {problemFiles.map((file, index) => (
                  <FileItem key={`problem-${file.name}-${index}`}>
                    <FileName>{file.name}</FileName>
                    <RemoveButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProblemFile(file.name);
                      }}
                    >
                      ×
                    </RemoveButton>
                  </FileItem>
                ))}
              </FileList>
            )}
          </UploadBox>
        </UploadSection>

        <InstructionSection>
          <InstructionList>
            <li>
              요약하고 싶은, 혹은 연습 문제를 만들고 싶은 강의자료를 왼쪽에
              업로드해주세요.
            </li>
            <li>
              원하는 문제 유형을 업로드하면 비슷한 유형의 문제로 출제됩니다.
            </li>
          </InstructionList>
        </InstructionSection>

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

        {showModal && (
          <Modal>
            <ModalContent>
              <ModalTitle>작업을 선택해주세요</ModalTitle>
              <ModalButtons>
                <ExButton
                  variant="filled"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/sample", {
                      state: { pdfFile: lectureFiles[0] },
                    });
                  }}
                >
                  요약본 생성하기
                </ExButton>
                <ExButton
                  variant="filled"
                  onClick={() => {
                    setShowModal(false);
                    navigate("/PracComplete"); // SamplePage로 이동
                  }}
                >
                  연습문제 생성하기
                </ExButton>
              </ModalButtons>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
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
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 25px;
`;

const UploadBox = styled.div`
  width: 400px;
  height: 300px;
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
  text-align: center;
`;

const InstructionList = styled.ul`
  font-size: 15px;
  list-style-type: none;
  text-align: left;

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

const ModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
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

export default UploadPage;
