import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SampleButton from "../components/SampleButton";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import character from "../images/character.png";

function CreatePracPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [problemFiles, setProblemFiles] = useState([]);
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onProblemDrop = useCallback((acceptedFiles) => {
    // 드래그로 파일을 업로드했을 때 받아온 파일을 콘솔로 확인
    console.log("문제 파일 드래그된 파일들:", acceptedFiles);

    // 문제 파일을 상태에 추가
    setProblemFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const onPDFDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setPdfFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps: getPDFRootProps, getInputProps: getPDFInputProps } =
    useDropzone({
      onDrop: onPDFDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
      multiple: false,
    });

  const {
    getRootProps: getProblemRootProps,
    getInputProps: getProblemInputProps,
    isDragActive: isProblemDragActive,
  } = useDropzone({
    onDrop: onProblemDrop,
    multiple: true,
    accept: ".pdf", // 원하는 파일 확장자 지정
  });

  const removeProblemFile = (fileName) => {
    setProblemFiles(problemFiles.filter((file) => file.name !== fileName));
  };

  const handleUpload = async () => {
    if (problemFiles.length === 0) {
      alert("문제 유형 파일을 업로드해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      problemFiles.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axiosInstance.request({
        method: "POST",
        url: "/pdf/upload/",
        data: formData,
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
        <TitleWrapper>
          <Title>요약된 강의자료로 연습 문제를 만들 수 있어요!</Title>
          <SubTitle>
            문제 유형을 업로드하고 실전 같은 문제를 만들어보세요!
          </SubTitle>
        </TitleWrapper>
        <MainContent>
          <PDFSection>
            <PDFViewer>
              <iframe src={"a"} title="PDF Viewer" width="100%" height="100%" />
            </PDFViewer>
          </PDFSection>

          {showPDFViewer && <Divider />}

          <PreviewSection {...getProblemRootProps()}>
            <input {...getProblemInputProps()} />
            <UploadTitle>문제 유형 업로드</UploadTitle>
            <UploadSubtitle>
              {isProblemDragActive
                ? "파일을 여기에 놓으세요"
                : "또는 드래그해서 파일 올리기"}
            </UploadSubtitle>
            {problemFiles.length > 0 && (
              <FileList>
                {problemFiles.map((file, index) => (
                  <FileItem key={index}>
                    <FileName>{file.name}</FileName>
                    <RemoveFileButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProblemFile(file.name);
                      }}
                    >
                      ×
                    </RemoveFileButton>
                  </FileItem>
                ))}
              </FileList>
            )}
            <InstructionSection>
              <InstructionList>
                <li>
                  파일명에 "문제", "기말고사", "중간고사" 등의 키워드를
                  포함시켜주세요.
                </li>
                <li>
                  키워드를 포함시키면 더욱 실전같은 문제를 만들 수 있습니다.
                </li>
              </InstructionList>
            </InstructionSection>
          </PreviewSection>
        </MainContent>
        <ButtonWrapper>
          <SampleButton onClick={handleUpload}>파일 업로드</SampleButton>
        </ButtonWrapper>
      </MainContentWrapper>
      <Footer />

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
          <ModalContentWrapper>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <ModalContent>
              <CharacterWrapper>
                <img src={character} alt="chracter" />
              </CharacterWrapper>
              <TextWrapper>
                파일 업로드가 완료되었습니다!
              </TextWrapper>
            </ModalContent>
            <ButtonContainer>
              <StyledExButton
                onClick={() => {
                  setShowModal(false);
                  navigate("/praccomplete", {
                    state: {
                      pdfFile: pdfFile,
                    },
                  });
                }}
              >
                연습 문제 생성하기
              </StyledExButton>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}
    </Container>
  );
}

const Container = styled.div``;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: #666;
  font-weight: 500;
  margin-bottom: 10px;
`;

const MainContent = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  justify-content: ${(props) =>
    props.isExtensionActive ? "center" : "space-between"};
`;

const PDFSection = styled.div`
  width: 100%;
  height: 100%;
`;

const PDFViewer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 2px solid #5887f4;
  border-radius: 8px;
  background: #fff;
  transition: all 0.3s ease;
  position: relative;

  iframe {
    width: 100%;
    border: none;
    height: 100%;
  }
`;

const UploadSection = styled.div`
  width: 100%;
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

const PreviewSection = styled(UploadSection)`
  position: relative;
  transition: width 0.3s ease;
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

const Divider = styled.div`
  width: 2px;
  height: 400px;
  background-color: #86abff;
  margin: 0 2rem;
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

const ButtonWrapper = styled.div`
  padding: 40px 30px 30px 30px;
`;

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
  z-index: 1000;
`;

const ModalContentWrapper = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const CharacterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 40%;
  }
`;

const TextWrapper = styled.div`
    font-size: 20px;

`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
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

const RemoveFileButton = styled.button`
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

export default CreatePracPage;
