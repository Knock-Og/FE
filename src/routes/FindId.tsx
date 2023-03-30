import { FindIdForm } from "components";
import styled from "styled-components";
const FindId = () => {
  return (
  <AdminWrap>
    <FindIdForm/>
  </AdminWrap>
  )
};

export default FindId;

const AdminWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
