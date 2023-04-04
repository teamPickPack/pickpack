import styled from "styled-components";
import ItemPreview from "./ItemPreview";

const ItemList = (props) => {
  return (
    <ListContainer>
      <ul>
        {props.itemList.map((item, idx) => {
          return <ItemPreview key={idx} item={item} />;
        })}
      </ul>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: -10px;

  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
`;

export default ItemList;
