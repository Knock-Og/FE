import { FindIdCodeForm } from "components";
import styled from "styled-components";
const FindIdCode = () => {
  return (
    <AdminWrap>
      <FindIdCodeForm />
    </AdminWrap>
  );
};

export default FindIdCode;

const AdminWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
