// globalStyles.js
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins_400Regular', // ใช้ฟอนต์ที่คุณต้องการ
    fontSize: 16,  // ขนาดฟอนต์
    color: '#333', // สีฟอนต์
  },
  headerText: {
    fontFamily: 'Poppins_600SemiBold', 
    fontSize: 24, 
    color: '#000', 
    textAlign: 'center',
    padding: '5',
  },
  // สไตล์อื่นๆ ที่ใช้ทั่วโลก
});

export default globalStyles;
