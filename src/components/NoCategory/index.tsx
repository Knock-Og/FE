import styled from "styled-components"

const NoCategory =()=>{
    return(
        <NoCategoryWrap>
            즐겨찾기한 폴더가 없습니다.
        </NoCategoryWrap>
    )
}
export default NoCategory

const NoCategoryWrap = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    height:100%;
`
