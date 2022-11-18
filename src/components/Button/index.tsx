import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
     children: string;
     onPress: () => void;
     disabled?: boolean;
     loading?: boolean;
}

export function Button(props: ButtonProps) {
     return (
          <Container onPress={props.onPress} disabled={props.disabled || props.loading}>
               {!props.loading && (
                    <Text weight="600" color="#FFFFFF">
                         {props.children}
                    </Text>
               )}
               {props.loading && (
                    <ActivityIndicator color="#FFFFFF" />
               )}
          </Container>
     );
};