import styled from "styled-components";

const Introduce = () => {
  return (
    <IntroduceWrapper>
      <IntroduceContent>
        <SectionTitle>AI 학습 도우미 소개</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureTitle>맞춤형 학습</FeatureTitle>
            <FeatureDesc>
              개인별 학습 수준과 목표에 맞는 맞춤형 학습을 제공합니다.
            </FeatureDesc>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>실시간 피드백</FeatureTitle>
            <FeatureDesc>
              학습 과정에서 즉각적인 피드백을 제공하여 이해도를 높입니다.
            </FeatureDesc>
          </FeatureCard>
          {/* 필요한 만큼 FeatureCard 추가 */}
        </FeatureGrid>
      </IntroduceContent>
    </IntroduceWrapper>
  );
};

const IntroduceWrapper = styled.section`
  padding: 80px 0;
  background-color: #ffffff;
`;

const IntroduceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const FeatureCard = styled.div`
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 40px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
`;

const FeatureDesc = styled.p`
  color: #666;
  line-height: 1.6;
`;

export default Introduce;
