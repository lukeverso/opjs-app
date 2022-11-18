import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { CloseButton, Footer, FooterContainer, Header, Image, Ingredient, IngredientsContainer, ModalBody, PriceContainer } from "./styles";

interface ProductModalProps {
     visible: boolean;
     onClose: () => void;
     product: null | Product;
     onAddToCart: (product: Product) => void;
}

export function ProductModal(props: ProductModalProps) {
     if (!props.product) {
          return null;
     };

     function handleAddToCart() {
          props.onAddToCart(props.product!);
          props.onClose();
     }

     return (
          <Modal
               visible={props.visible}
               animationType="slide"
               presentationStyle="pageSheet"
               onRequestClose={props.onClose}
          >
               <Image
                    source={{
                         uri: `http://192.168.0.21:7000/uploads/${props.product.imagePath}`
                    }}
               >
                    <CloseButton onPress={props.onClose}>
                         <Close />
                    </CloseButton>
               </Image>
               <ModalBody>
                    <Header>
                         <Text size={24} weight="600">{props.product.name}</Text>
                         <Text color="#666666" style={{ marginTop: 8 }}>{props.product.description}</Text>
                    </Header>
                    {props.product.ingredients.length > 0 && (
                         <IngredientsContainer>
                         <Text weight="600" color="#666666">Ingredientes</Text>
                         <FlatList
                              data={props.product.ingredients}
                              keyExtractor={ingredient => ingredient._id}
                              showsVerticalScrollIndicator={false}
                              style={{ marginTop: 16 }}
                              renderItem={({ item: ingredient }) => (
                                   <Ingredient>
                                        <Text>{ingredient.icon}</Text>
                                        <Text size={14} color="#666666" style={{ marginLeft: 20 }}>{ingredient.name}</Text>
                                   </Ingredient>
                              )}
                         />
                    </IngredientsContainer>
                    )}
               </ModalBody>
               <Footer>
                    <FooterContainer>
                         <PriceContainer>
                              <Text color="#666666">Preço</Text>
                              <Text size={20} weight="600">{formatCurrency(props.product.price)}</Text>
                         </PriceContainer>
                         <Button onPress={handleAddToCart}>
                              Adicionar ao pedido
                         </Button>
                    </FooterContainer>
               </Footer>
          </Modal>
     );
};