import styled from "styled-components";
import ItemPreview from "./ItemPreview";

const ItemList = (props) => {
  return (
    <ListContainer>
      <ul>
        {props.itemList.map((item) => {
          return <ItemPreview key={item.itemId} item={item} />;
        })}
      </ul>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  margin-top: -10px;

  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
  }
`;

export default ItemList;
