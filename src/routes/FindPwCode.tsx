import { FindPwCodeForm } from "components";
import styled from "styled-components";
const FindPwCode = () => {
  return (
    <AdminWrap>
      <FindPwCodeForm />
    </AdminWrap>
  );
};

export default FindPwCode;

const AdminWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
