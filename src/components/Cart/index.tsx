import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { api } from "../../utils/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderConfirmModal } from "../OrderConfirmModal";
import { Text } from "../Text";
import { Actions, Image, Item, ProductContainer, ProductDetails, QuantityContainer, Summary, TotalContainer } from "./styles";

interface CartProps {
     cartItems: CartItem[];
     onAdd: (product: Product) => void;
     onDecrement: (product: Product) => void;
     onConfirmOrder: () => void;
     selectedTable: string;
}

export function Cart(props: CartProps) {
     const [loading, setLoading] = useState(false);
     const [isModalVisible, setIsModalVisible] = useState(false);

     const total = props.cartItems.reduce((acc, cartItem) => {
          return acc + cartItem.quantity * cartItem.product.price;
     }, 0);

     async function handleConfirmOrder() {
          setLoading(true);
          const payload = {
               table: props.selectedTable,
               products: props.cartItems.map((cartItem) => ({
                    product: cartItem.product._id,
                    quantity: cartItem.quantity
               }))
          };
          await api.post('/orders', payload);
          setLoading(false);
          setIsModalVisible(true);
     };

     function handleOk() {
          props.onConfirmOrder();
          setIsModalVisible(false);
     };

     return (
          <>
               <OrderConfirmModal
                    visible={isModalVisible}
                    onOk={handleOk}
               />
               {props.cartItems.length > 0 && (
                    <FlatList
                         data={props.cartItems}
                         keyExtractor={cartItem => cartItem.product._id}
                         showsVerticalScrollIndicator={false}
                         style={{ marginBottom: 20, maxHeight: 140 }}
                         renderItem={({ item: cartItem }) => (
                              <Item>
                                   <ProductContainer>
                                        <Image
                                             source={{
                                                  uri: `http://192.168.0.120:7000/uploads/${cartItem.product.imagePath}`
                                             }}
                                        />
                                        <QuantityContainer>
                                             <Text size={14} color="#666666">
                                                  {cartItem.quantity}x
                                             </Text>
                                        </QuantityContainer>
                                        <ProductDetails>
                                             <Text size={14} weight="600">{cartItem.product.name}</Text>
                                             <Text size={14} color="#666666" style={{ marginTop: 4 }}>{formatCurrency(cartItem.product.price)}</Text>
                                        </ProductDetails>
                                   </ProductContainer>
                                   <Actions>
                                        <TouchableOpacity
                                             style={{ marginRight: 24 }}
                                             onPress={() => props.onAdd(cartItem.product)}
                                        >
                                             <PlusCircle />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                             onPress={() => props.onDecrement(cartItem.product)}
                                        >
                                             <MinusCircle />
                                        </TouchableOpacity>
                                   </Actions>
                              </Item>
                         )}
                    />
               )}
               <Summary>
                    <TotalContainer>
                         {props.cartItems.length > 0 ? (
                              <>
                                   <Text color="#666666">Total</Text>
                                   <Text size={20} weight="600">{formatCurrency(total)}</Text>
                              </>
                         ) : (
                              <Text color="#999999">Seu carrinho está vazio</Text>
                         )}
                    </TotalContainer>
                    <Button onPress={handleConfirmOrder} disabled={props.cartItems.length === 0} loading={loading}>
                         Confirmar pedido
                    </Button>
               </Summary>
          </>
     );
};