import { AdminForm,AdminNav } from "components";
import styled from "styled-components";
const Admin = () => {
  return (
    <AdminWrap>
      <AdminNav />
      <AdminForm />
    </AdminWrap>
  );
};

export default Admin


const AdminWrap =styled.div`
  display: flex;
`
