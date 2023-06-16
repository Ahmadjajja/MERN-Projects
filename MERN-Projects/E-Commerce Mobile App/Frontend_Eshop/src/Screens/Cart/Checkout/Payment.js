import { View, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import {
  Container,
  Header,
  Content,
  HStack,
  VStack,
  Heading,
  Box,
  Text,
  Radio,
  Select, CheckIcon, Center
} from 'native-base';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const methods = [
  { name: "Cash on-Delivery", value: "one" },
  { name: "Bank Transfer", value: "two" },
  { name: "Card Payment", value: "three" }
]

const paymentCards = [
  { name: 'Wallet', value: "one" },
  { name: 'visa', value: "two" },
  { name: 'MasterCard', value: "three" },
  { name: 'Other', value: "four" },
]
const Payment = (props) => {
  const order = props.route.params; //what does this line means

  const [selected, setSelected] = useState('one');
  const [card, setCard] = useState();


  return (
    <Box>
      <HStack style={{ paddingHorizontal: 15, paddingVertical: 30, backgroundColor: "#fff" }}>
        <Heading >Choose your payment method</Heading>
      </HStack>
      <VStack>
        {methods.map((item, index) => {
          return (
            <HStack space={3} key={item.name} style={styles.listItem}>
              <TouchableOpacity style={{ flexDirection: 'row', width: "100%", justifyContent: "space-between" }} onPress={() => setSelected(item.value)}>
                <Text w="50%" >{item.name}</Text>

                <Radio.Group style={styles.radioButton} w="50%" name="paymentMethodGroup" accessibilityLabel="paymentMethodNumber" value={selected} >
                  <Radio value={selected == item.value ? selected : ""} my={1} />
                </Radio.Group>
              </TouchableOpacity>
            </HStack>
          )
        })}
        {selected == 'three' ?
          <Center>
            <Box w="3/4" maxW="300">
              <Select
                selectedValue={card}
                minWidth="200"

                accessibilityLabel="Choose Payment Card"
                placeholder="Choose Payment Card"
                _selectedItem={{
                  bg: "orange",
                  endIcon: <CheckIcon size="5" />
                }}
                mt={1}
                onValueChange={itemValue => setCard(itemValue)}>
                {paymentCards.map((c) => {
                  return <Select.Item
                    key={c.code}
                    label={c.name}
                    value={c.name}
                  />
                })}
              </Select>
            </Box>
          </Center> : null
        }
        <View style={styles.confirmButton}>
          <Button
          
          title={"Confirm"}
          onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </VStack>
    </Box>
  )
}

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
  }, radioButton: {
    alignItems: 'flex-end',
  }, confirmButton: {
    marginTop: 10,
    width: "75%",
    alignSelf: 'center'
  }
})

export default Payment