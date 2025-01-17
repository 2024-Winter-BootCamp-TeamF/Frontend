import styled from "styled-components";
import summaryIcon from "../images/summary.png";
import practiceIcon from "../images/practice.png";
import noteIcon from "../images/note.png";
import homeIcon from "../images/mypage.png";

const Introduce = () => {
  const menuItems = [
    {
      title: "강의 자료 요약",
      icon: summaryIcon,
    },
    {
      title: "연습 문제 생성",
      icon: practiceIcon,
    },
    {
      title: "오답 노트 제공",
      icon: noteIcon,
    },
    {
      title: "마이페이지",
      icon: homeIcon,
    },
  ];

  return (
    <IntroduceWrapper>
      <ScrollSection>
        <MenuSection>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <MenuTitle>{item.title}</MenuTitle>
              <IconWrapper>
                <img src={item.icon} alt={item.title} />
              </IconWrapper>
            </MenuItem>
          ))}
        </MenuSection>
        <ContentSection>
          <PlaceholderText>(이미지 생기면 추가 예정)</PlaceholderText>
        </ContentSection>
      </ScrollSection>
    </IntroduceWrapper>
  );
};

const IntroduceWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin: 0 auto;
  padding: 40px;
`;

const ScrollSection = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const MenuItem = styled.div`
  background-color: #84a7ff;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
`;

const MenuTitle = styled.span`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ContentSection = styled.div`
  background-color: #fff;
  flex: 1;
  border: 5px solid #84a7ff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.div`
  color: #999;
  font-size: 16px;
`;

export default Introduce;
