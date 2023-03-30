import { FindPwForm } from "components";
import styled from "styled-components";
const FindPw = () => {
  return (
    <AdminWrap>
      <FindPwForm />
    </AdminWrap>
  );
};

export default FindPw;

const AdminWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
