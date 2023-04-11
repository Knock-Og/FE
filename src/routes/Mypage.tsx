import { Header, MypageForm } from "components";
import styled from "styled-components";

const Mypage = ()=>{
    return (
      <>
        <Header />
        <Inner>
          <MypageForm />
        </Inner>
      </>
    );
}
export default Mypage;

const Inner = styled.div`
    width:1376px;
    margin: 0 auto;
`