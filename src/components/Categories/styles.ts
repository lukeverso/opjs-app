import { Platform } from "react-native";
import styled from "styled-components/native";

const isAndroid = Platform.OS === 'android';

export const CategoryContainer = styled.TouchableOpacity`
     align-items: center;
     margin-left: 24px;
`;

export const Icon = styled.View`
     background: #FFFFFF;
     width: 44px;
     height: 44px;
     border-radius: 22px;
     justify-content: center;
     align-items: center;
     margin-bottom: 8px;
`;