import { useState } from "react";
import { Modal, Platform, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Form, Header, Input, ModalBody, Overlay } from "./styles";

interface TableModalProps {
     visible: boolean;
     onClose: () => void;
     onSave: (table: string) => void;
}

export function TableModal(props: TableModalProps) {
     const [table, setTable] = useState('');

     function handleSave() {
          setTable('');
          props.onSave(table);
          props.onClose();
     };

     return (
          <Modal
               visible={props.visible}
               transparent
               animationType="fade"
          >
               <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
                    <ModalBody>
                         <Header>
                              <Text weight="600">Informe a mesa</Text>
                              <TouchableOpacity onPress={props.onClose}>
                                   <Close color="#666666" />
                              </TouchableOpacity>
                         </Header>
                         <Form>
                              <Input
                                   placeholder="Número da mesa"
                                   placeholderTextColor='#666666'
                                   keyboardType="number-pad"
                                   onChangeText={setTable}
                              />
                              <Button onPress={handleSave} disabled={table.length === 0}>
                                   Salvar
                              </Button>
                         </Form>
                    </ModalBody>
               </Overlay>
          </Modal>
     );
};