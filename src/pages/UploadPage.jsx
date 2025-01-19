import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExButton from "../components/ExButton";
import { useDropzone } from "react-dropzone";

const UploadPage = () => {
  const [lectureFiles, setLectureFiles] = useState([]);
  const [problemFiles, setProblemFiles] = useState([]);

  const onLectureDrop = useCallback((acceptedFiles) => {
    setLectureFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const onProblemDrop = useCallback((acceptedFiles) => {
    setProblemFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const removeLectureFile = (fileName) => {
    setLectureFiles(lectureFiles.filter(file => file.name !== fileName));
  };

  const removeProblemFile = (fileName) => {
    setProblemFiles(problemFiles.filter(file => file.name !== fileName));
  };

  const {
    getRootProps: getLectureRootProps,
    getInputProps: getLectureInputProps,
    isDragActive: isLectureDragActive
  } = useDropzone({ onDrop: onLectureDrop });

  const {
    getRootProps: getProblemRootProps,
    getInputProps: getProblemInputProps,
    isDragActive: isProblemDragActive
  } = useDropzone({ onDrop: onProblemDrop });

  return (
    <Container>
      <Header />

      <TitleSection>
        <MainTitle>PDF를 업로드하고 요약된 강의자료로 학습해보세요!</MainTitle>
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
                  <RemoveButton onClick={(e) => {
                    e.stopPropagation();
                    removeLectureFile(file.name);
                  }}>
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
                  <RemoveButton onClick={(e) => {
                    e.stopPropagation();
                    removeProblemFile(file.name);
                  }}>
                    ×
                  </RemoveButton>
                </FileItem>
              ))}
            </FileList>
          )}
        </UploadBox>
      </UploadSection>

      <InstructionSection>
        <InstructionTitle></InstructionTitle>
        <InstructionList>
          <li>요약하고 싶은, 혹은 연습 문제를 만들고 싶은 강의자료를 왼쪽에 업로드해주세요.</li>
          <li>원하는 문제 유형을 업로드하면 비슷한 유형의 문제로 출제됩니다.</li>
        </InstructionList>
      </InstructionSection>

      <ButtonSection>
        <ExButton 
          variant="outlined"  
          onClick={() => {}}
        >
          요약본 생성하기
        </ExButton>
        <ExButton 
          variant="filled" 
          onClick={() => {}}
        >
          연습 문제 생성하기
        </ExButton>
      </ButtonSection>

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
  justify-content: center;
`;

const TitleSection = styled.div`
  text-align: center;
  margin: 5px 0;
`;

const MainTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  color: #666;
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 20px 0;
`;

const UploadBox = styled.div`
  width: 400px;
  height: 300px;
  border: 2px dashed #86ABFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #5c85ff;
    background-color: #f8f9ff;
  }
`;

const UploadTitle = styled.h3`
  font-size: 20px;
  color: #5c85ff;
  margin-bottom: 10px;
`;

const UploadSubtitle = styled.p`
  font-size: 16px;
  color: #666;
`;

const FileList = styled.div`
  margin-top: 20px;
  width: 90%;
  max-height: 150px;
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
  color: #5C85FF;
  margin-right: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff5c5c;
  font-size: 18px;
  cursor: pointer;
  padding: 0 5px;
  
  &:hover {
    color: #ff3333;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 300px;
  background-color: #E0E0E0;
`;

const InstructionSection = styled.div`
  // margin: 40px 0;
  text-align: center;
`;

const InstructionTitle = styled.h3`
  font-size: 18px;
  // margin-bottom: 10px;
`;

const InstructionList = styled.ul`
  list-style-type: none;
  text-align: left;
  
  li {
    margin: 10px 0;
    color: #666;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 20px;
  margin: 10px 0;
`;

export default UploadPage;