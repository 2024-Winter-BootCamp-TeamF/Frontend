import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SampleButton from "../components/SampleButton";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import character from "../images/character.png";
import { useLocation } from "react-router-dom";

function CreatePracPage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [problemFiles, setProblemFiles] = useState([]);
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isFileUploading, setIsFileUploading] = useState(false); // 파일 업로드 로딩 상태
  const [isProblemCreating, setIsProblemCreating] = useState(false); // 문제 생성 로딩 상태
  const [showModal, setShowModal] = useState(false); // showModal 상태 추가
  const [showFileCountModal, setShowFileCountModal] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();
  const { topics, summaryPDF } = location.state || {};

  console.log("Topics:", topics);
  console.log("SummaryPDF:", summaryPDF);

  const onProblemDrop = useCallback((acceptedFiles) => {
    setProblemFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

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

    setIsFileUploading(true); // 파일 업로드 로딩 시작

    try {
      const formData = new FormData();
      problemFiles.forEach((file) => {
        formData.append("file", file);
      });

      const response = await axiosInstance.request({
        method: "POST",
        url: "/pdf/upload",
        data: formData,
      });
      console.log(response.data);
      setFileCount(problemFiles.length); // 업로드한 파일 개수 설정
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
      setIsFileUploading(false); // 파일 업로드 로딩 종료
    }
  };

  const handleCreate = async () => {
    console.log(
      "생성 요청에 포함된 토픽:",
      Array.isArray(topics) ? topics : [topics]
    );

    setIsProblemCreating(true); // 문제 생성 로딩 시작

    try {
      const response = await fetch(
        "http://localhost:8000/api/question/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            topics: Array.isArray(topics) ? topics : [topics],
          }),
        }
      );

      if (!response.ok) throw new Error("API 호출 실패");

      const data = await response.json();

      console.log("API Response:", data);
      navigate("/praccomplete", {
        state: {
          problems: data,
          topics,
          pdfFile,
        },
      });
    } catch (error) {
      console.error("Error:", error.message);
      alert("연습 문제 생성 중 오류가 발생했습니다.");
    } finally {
      setIsProblemCreating(false); // 로딩 종료
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
      setShowModal(true); // 토픽 및 Top K 입력 모달 띄우기
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
        <TitleWrapper>
          <Title>요약된 강의자료로 연습 문제를 만들 수 있어요!</Title>
          <SubTitle>
            문제 유형을 업로드하고 실전 같은 문제를 만들어보세요!
          </SubTitle>
        </TitleWrapper>
        <MainContent>
          <PDFSection>
            <PDFViewer>
              <iframe
                src={summaryPDF}
                title="PDF Viewer"
                width="100%"
                height="100%"
              />
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
                  <FileItem key={`problem-${file.name}-${index}`}>
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
                  문제 유형을 업로드 한 후, "파일 업로드" 버튼을 눌러주세요.
                </li>
                <li>
                  업로드 할 문제 유형이 없다면 "연습 문제 생성" 버튼을
                  눌러주세요.
                </li>
              </InstructionList>
            </InstructionSection>
          </PreviewSection>
        </MainContent>
        <ButtonWrapper>
          <SampleButton onClick={handleUpload}>파일 업로드</SampleButton>
          <SampleButton onClick={handleCreate}>연습 문제 생성</SampleButton>
        </ButtonWrapper>
      </MainContentWrapper>
      <Footer />

      {isFileUploading && (
        <LoadingModal>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>파일을 처리하고 있습니다...</LoadingText>
          </LoadingContent>
        </LoadingModal>
      )}

      {isProblemCreating && (
        <LoadingModal>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>
              문제를 생성 중입니다. 잠시만 기다려주세요...
            </LoadingText>
          </LoadingContent>
        </LoadingModal>
      )}

      {showFileCountModal && (
        <Modal>
          <ModalContentWrapper>
            <FileModalContent>
              <CharacterWrapper>
                <img src={character} alt="chracter" />
              </CharacterWrapper>
              <TextWrapper>{fileCount}개 파일 업로드 성공!</TextWrapper>
            </FileModalContent>
            <ButtonContainer>
              <StyledExButton variant="filled" onClick={handleConfirmFileCount}>
                다음
              </StyledExButton>
            </ButtonContainer>
          </ModalContentWrapper>
        </Modal>
      )}

      {showModal && (
        <Modal>
          <ModalContentWrapper>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <ModalContent>
              <CharacterWrapper>
                <img src={character} alt="chracter" />
              </CharacterWrapper>
              <TextWrapper>이제 문제를 만들어볼까요?</TextWrapper>
            </ModalContent>
            <ButtonContainer>
              <StyledExButton
                onClick={() => {
                  setShowModal(false);
                  handleCreate();
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
  height: 100%;
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
  height: 90%;
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
  display: flex;
  padding: 40px 30px 30px 30px;
  gap: 100px;
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

const FileModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
`;

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
