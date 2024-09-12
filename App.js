import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    ['C', 'DEL', '*'],
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '='],
  ];

  const operations = ['/', '-', '+']; // Các nút ở cột bên phải

  function calculator() {
    let lastChar = currentNumber[currentNumber.length - 1];
    if (['/', '*', '-', '+', '.'].includes(lastChar)) {
      return; // Ngăn chặn các phép toán không hợp lệ
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      setLastNumber(currentNumber + ' = '); // Hiển thị dấu =
    }
  }

  function handleInput(buttonPressed) {
    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (buttonPressed === 'DEL') {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
      return;
    } else if (buttonPressed === 'C') {
      Vibration.vibrate(35);
      setCurrentNumber('');
      setLastNumber('');
      return;
    } else if (buttonPressed === '=') {
      Vibration.vibrate(35);
      calculator();
      return;
    } else {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
    }
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: '#f5f5f5',
      maxWidth: '100%',
      minHeight: '25%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      padding: 10,
    },
    resultText: {
      color: '#00b9d6',
      margin: 10,
      fontSize: 30,
    },
    historyText: {
      color: '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      height: '50%', // Khu vực của các nút
    },
    buttons: {
      width: '75%', // Chiếm 75% chiều ngang
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    buttonColumn: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '25%', // Chiếm 25% chiều ngang cho cột các nút toán học
    },
    button: {
      borderColor: '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '33%', // Giảm kích thước chiều rộng
      minHeight: '20%', // Giảm kích thước chiều cao
    },
    buttonOp: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '20%',
      minWidth: '100%', // Nút toán học chiếm hết chiều ngang của cột
      backgroundColor: '#00b9d6',
    },
    textButton: {
      color: '#7c7c7c',
      fontSize: 22,
    },
    textButtonOp: {
      color: 'white',
      fontSize: 22,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttons}>
          {buttons.map((row, rowIndex) =>
            row.map((button, buttonIndex) => (
              <TouchableOpacity
                key={button}
                style={[styles.button, { backgroundColor: button === '=' ? '#00b9d6' : '#fff' }]}
                onPress={() => handleInput(button)}
              >
                <Text
                  style={[
                    styles.textButton,
                    { color: button === '=' ? 'white' : '#7c7c7c' },
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <View style={styles.buttonColumn}>
          {operations.map((op) => (
            <TouchableOpacity
              key={op}
              style={styles.buttonOp}
              onPress={() => handleInput(op)}
            >
              <Text style={styles.textButtonOp}>{op}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
