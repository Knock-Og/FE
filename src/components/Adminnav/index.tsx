import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeCookie } from "api/cookies";
import { Alert } from "components";

const AdminNav = () => {
  const pathname = window.location.pathname;
  const navigate = useNavigate();

  const handleClickLogOut = () => {
    removeCookie("reqWithToken");
    setTimeout(() => navigate("/admin/login"), 500);
  };

  return (
    <>
      <Alert />
      <StAdminNavWrap>
        <StLogo>
          <StLogoSvg>
            <g clipPath="url(#clip0_511_8280)">
              <path d="M35.7765 31.1449L51.2267 51.8635H41.711L30.4559 36.721L23.6005 44.0797V51.892H15.8242V15.3738H23.6005V32.9274L40.5324 15.2773H51.041L35.7765 31.1449Z" />
              <path d="M84.9733 51.692H78.0649L63.5469 31.9343V51.6991H57.457V23.0039H64.3655L78.8683 42.883V23.0039H84.9733V51.692Z" />
              <path d="M170.538 35.4109L182.664 51.6928H175.195L166.358 39.7939L160.976 45.5487V51.6821H154.879V23.0298H160.984V36.8112L174.282 22.9512H182.516L170.538 35.4109Z" />
              <path d="M105.502 22.6875C96.3422 22.6875 90.0742 29.3139 90.0742 37.3334C90.0742 45.3529 96.3422 51.9793 105.502 51.9793C114.661 51.9793 120.925 45.3886 120.925 37.3334C120.925 29.2781 114.657 22.6875 105.502 22.6875ZM105.502 46.9997C103.786 47.0166 102.102 46.5596 100.659 45.6851C103.758 44.8921 106.085 41.5985 106.085 37.6513C106.085 33.4147 103.402 29.9283 99.9575 29.4853C101.532 28.3048 103.49 27.6737 105.502 27.6992C111.243 27.6992 114.82 32.4359 114.82 37.3441C114.82 42.2522 111.243 46.9997 105.502 46.9997Z" />
              <path d="M139.125 46.9985C137.546 47.013 135.997 46.5934 134.668 45.7911C138.583 45.2624 141.614 41.8188 141.614 37.6501C141.614 33.1992 138.166 29.577 133.857 29.4341C135.332 28.2711 137.202 27.6472 139.125 27.6766C140.45 27.6846 141.754 27.9912 142.928 28.571C144.102 29.1508 145.112 29.9868 145.874 31.0094L149.77 26.9586C148.398 25.6082 146.751 24.5326 144.928 23.7961C143.104 23.0595 141.142 22.6772 139.159 22.672C129.999 22.6363 124.137 29.2984 124.137 37.3179C124.137 45.3374 129.999 51.9638 139.159 51.9638C143.82 52.0388 147.075 50.2956 149.77 47.6772L145.601 43.8514C144.876 44.834 143.906 45.6344 142.777 46.1829C141.649 46.7315 140.395 47.0114 139.125 46.9985Z" />
              <path d="M188.195 39.9366L192.481 17.3105L200.152 18.5215L195.85 41.2226L188.195 39.9366Z" />
              <path d="M187.034 46.4554C187.116 45.9922 187.294 45.5488 187.558 45.1507C187.823 44.7525 188.167 44.4074 188.573 44.135C188.979 43.8626 189.438 43.6683 189.924 43.5632C190.409 43.4581 190.912 43.4444 191.403 43.5226L191.589 43.5512C192.081 43.6283 192.551 43.7961 192.974 44.0449C193.397 44.2937 193.764 44.6188 194.053 45.0013C194.342 45.3839 194.549 45.8166 194.66 46.2745C194.772 46.7324 194.787 47.2066 194.704 47.6699C194.622 48.1342 194.443 48.5785 194.178 48.9775C193.913 49.3765 193.567 49.7221 193.16 49.9947C192.753 50.2672 192.293 50.4612 191.806 50.5655C191.319 50.6699 190.815 50.6825 190.323 50.6027L190.137 50.5741C189.647 50.4958 189.177 50.3271 188.756 50.0777C188.334 49.8284 187.969 49.5032 187.681 49.1207C187.392 48.7382 187.187 48.306 187.076 47.8487C186.965 47.3914 186.951 46.9179 187.034 46.4554Z" />
              <path d="M31.5919 7.00226L25.6094 9.44141L26.8129 12.0643L32.7954 9.62516L31.5919 7.00226Z" />
              <path d="M19.3766 0.0043918L18.4414 7.48633L21.4523 7.82073L22.3875 0.338796L19.3766 0.0043918Z" />
              <path d="M7.75759 2.16228L5.51562 4.08594L9.90324 8.6296L12.1452 6.70594L7.75759 2.16228Z" />
              <path d="M0.924216 11.4611L0.152344 14.2246L8.22205 16.2273L8.99393 13.4637L0.924216 11.4611Z" />
              <path d="M8.28864 19.6627L0.925781 24.7441L2.71674 27.0499L10.0796 21.9685L8.28864 19.6627Z" />
            </g>
          </StLogoSvg>
        </StLogo>
        <StNav>
          <StNavLink href="/admin">
            <StNavButton active={pathname === "/admin"}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M34 35V31.6667C34 29.8986 33.2625 28.2029 31.9497 26.9526C30.637 25.7024 28.8565 25 27 25H13C11.1435 25 9.36301 25.7024 8.05025 26.9526C6.7375 28.2029 6 29.8986 6 31.6667V35" />
                <path d="M20 20C24.4183 20 28 16.6421 28 12.5C28 8.35786 24.4183 5 20 5C15.5817 5 12 8.35786 12 12.5C12 16.6421 15.5817 20 20 20Z" />
              </svg>
              <StBtnP>사용자관리</StBtnP>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21.6666C20.9205 21.6666 21.6666 20.9204 21.6666 19.9999C21.6666 19.0794 20.9205 18.3333 20 18.3333C19.0795 18.3333 18.3333 19.0794 18.3333 19.9999C18.3333 20.9204 19.0795 21.6666 20 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M31.6667 21.6666C32.5871 21.6666 33.3333 20.9204 33.3333 19.9999C33.3333 19.0794 32.5871 18.3333 31.6667 18.3333C30.7462 18.3333 30 19.0794 30 19.9999C30 20.9204 30.7462 21.6666 31.6667 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33335 21.6666C9.25383 21.6666 10 20.9204 10 19.9999C10 19.0794 9.25383 18.3333 8.33335 18.3333C7.41288 18.3333 6.66669 19.0794 6.66669 19.9999C6.66669 20.9204 7.41288 21.6666 8.33335 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </StNavButton>
          </StNavLink>
          <StNavLink href="/admin/category">
            <StNavButton active={pathname === "/admin/category"}>
              <svg
                width="43"
                height="45"
                viewBox="0 0 43 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_233_1395)">
                  <path
                    d="M34.8462 4H25.1538C23.9643 4 23 4.96431 23 6.15385V15.8462C23 17.0357 23.9643 18 25.1538 18H34.8462C36.0357 18 37 17.0357 37 15.8462V6.15385C37 4.96431 36.0357 4 34.8462 4Z"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8462 4H7.15385C5.96431 4 5 4.96431 5 6.15385V15.8462C5 17.0357 5.96431 18 7.15385 18H16.8462C18.0357 18 19 17.0357 19 15.8462V6.15385C19 4.96431 18.0357 4 16.8462 4Z"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.8462 22H7.15385C5.96431 22 5 22.9643 5 24.1538V33.8462C5 35.0357 5.96431 36 7.15385 36H16.8462C18.0357 36 19 35.0357 19 33.8462V24.1538C19 22.9643 18.0357 22 16.8462 22Z"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="31" cy="29" r="7" strokeWidth="2.5" />
                </g>
              </svg>
              <StBtnP> 카테고리관리</StBtnP>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21.6666C20.9205 21.6666 21.6666 20.9204 21.6666 19.9999C21.6666 19.0794 20.9205 18.3333 20 18.3333C19.0795 18.3333 18.3333 19.0794 18.3333 19.9999C18.3333 20.9204 19.0795 21.6666 20 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M31.6667 21.6666C32.5871 21.6666 33.3333 20.9204 33.3333 19.9999C33.3333 19.0794 32.5871 18.3333 31.6667 18.3333C30.7462 18.3333 30 19.0794 30 19.9999C30 20.9204 30.7462 21.6666 31.6667 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.33335 21.6666C9.25383 21.6666 10 20.9204 10 19.9999C10 19.0794 9.25383 18.3333 8.33335 18.3333C7.41288 18.3333 6.66669 19.0794 6.66669 19.9999C6.66669 20.9204 7.41288 21.6666 8.33335 21.6666Z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </StNavButton>
          </StNavLink>
          <StLogin onClick={handleClickLogOut}>로그아웃</StLogin>
        </StNav>
      </StAdminNavWrap>
    </>
  );
};

export default AdminNav;
const StAdminNavWrap = styled.div`
  width: 20.21%;
  height: 100vh;
  position: fixed;
  background: ${(props) => props.theme.bgLightBlue};
  overflow: hidden;
`;

const StLogo = styled.div`
  width: 100%;
  padding-left: 7.73%;
  margin: 45px 0 80px;
`;
const StLogoSvg = styled.svg`
  width: 200px;
  height: 52px;
  fill: ${(props) => props.theme.bgBlue};
`;

const StNav = styled.div``;
const StNavLink = styled.a`
  margin-bottom: 26px;
  display: block;
`;
const StNavButton = styled.button<{ active?: boolean }>`
  width: 100%;
  height: 66px;
  padding-left: 14.95%;
  padding-right: 12.89%;
  color: ${({ active, theme }) => (active ? theme.bgBlue : theme.fillGrey)};
  background: none;
  border: 0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 10px solid
    ${({ active, theme }) => (active ? theme.bgBlue : "transparent")};
  fill: ${({ active, theme }) => (active ? theme.bgBlue : theme.fillGrey)};
  stroke: ${({ active, theme }) => (active ? theme.bgBlue : theme.fillGrey)};
`;
const StBtnP = styled.p`
  font-weight: 800;
  font-size: 18px;
`;
const StLogin = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 80%;
  height: 60px;
  border-radius: 5px;
  margin: 0 auto;
  line-height: 60px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  background: ${(props) => props.theme.bgBlue};
  color: ${(props) => props.theme.textwhite};
`;
