# expo-datepicker

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

expo-datepicker is a beautiful and simple datepicker for react native and expo

[DEMO](https://snack.expo.io/@stealkiller06/expo-datepicker)

## Installation

```sh
npm i expo-datepicker
yarn add expo-datepicker
```

## Example

```javascript
import React, { useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import DatePicker from "expo-datepicker";
import { Entypo } from "@expo/vector-icons";
export default function App() {
  const [date, setDate] = useState(new Date().toString());

  return (
    <View style={styles.container}>
      <DatePicker
        date={date}
        onChange={(date) => setDate(date)}
        icon={<Entypo name="chevron-right" size={40} color="#689CA3" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## Properties

| Property       | Description           |
| -------------- | --------------------- |
| date           | Current date selected |
| icon           | Icon                  |
| fontStyle      | Input text style      |
| containerStyle | Container Style       |

## Events

| Property | Description         |
| -------- | ------------------- |
| onChange | (date:string)=>void |

## License

MIT

**Free Software, Hell Yeah!**
