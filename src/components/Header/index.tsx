import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, Table } from "./styles";

interface HeaderProps {
     selectedTable: string;
     onCancelOrder: () => void;
}

export function Header(props: HeaderProps) {
     return (
          <Container>
               {!props.selectedTable && (
                    <>
                         <Text size={14} opacity={0.9}>Bem-vindo(a) ao</Text>
                         <Text size={24} weight="700">
                              WAITER
                              <Text size={24}>APP</Text>
                         </Text>
                    </>
               )}
               {props.selectedTable && (
                    <Content>
                         <OrderHeader>
                              <Text size={24} weight="600">Pedido</Text>
                              <TouchableOpacity onPress={props.onCancelOrder}>
                                   <Text color="#D73530" weight="600" size={14}>
                                        cancelar pedido
                                   </Text>
                              </TouchableOpacity>
                         </OrderHeader>
                         <Table>
                              <Text color="#666666">
                                   Mesa {props.selectedTable}
                              </Text>
                         </Table>
                    </Content>
               )}
          </Container>
     );
};