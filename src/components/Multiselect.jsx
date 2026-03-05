// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet
// } from "react-native";

// import { MultiSelect } from "react-native-element-dropdown";
// import symptoms from "../data/Symptoms.json";
// import { useAppTheme } from "../Theme/ThemeContext";

// export default function SymptomSelector() {

//   const { colors } = useAppTheme();
//   const [selected, setSelected] = useState([]);

//   const symptomData = symptoms.map((item) => ({
//     label: item,
//     value: item
//   }));

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>

//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === "ios" ? "padding" : undefined}
//       >

//         <View style={styles.container}>

//           <Text style={[styles.title, { color: colors.text }]}>
//             Select Symptoms
//           </Text>

//           <MultiSelect
//             data={symptomData}
//             labelField="label"
//             valueField="value"

//             placeholder="Search symptoms..."
//             search

//             value={selected}
//             onChange={(item) => setSelected(item)}

//             dropdownPosition="bottom"
//             maxHeight={250}

//             style={[
//               styles.dropdown,
//               { backgroundColor: colors.card, borderColor: colors.border }
//             ]}

//             placeholderStyle={{ color: colors.textSecondary }}

//             inputSearchStyle={styles.searchInput}

//             containerStyle={styles.dropdownContainer}

//             selectedStyle={[
//               styles.selectedItem,
//               { backgroundColor: colors.primary }
//             ]}

//             selectedTextStyle={styles.selectedText}
//           />

//         </View>

//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     padding: 20
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10
//   },

//   dropdown: {
//     borderWidth: 1,
//     borderRadius: 12,
//     padding: 12
//   },

//   dropdownContainer: {
//     borderRadius: 12
//   },

//   searchInput: {
//     height: 40,
//     fontSize: 16
//   },

//   selectedItem: {
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6
//   },

//   selectedText: {
//     color: "#fff",
//     fontSize: 14
//   }
// });

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import symptoms from "../data/Symptoms.json";
import { useAppTheme } from "../Theme/ThemeContext";

export default function SymptomSelector({ selected, setSelected }) {

  const { colors } = useAppTheme();

  const symptomData = symptoms.map((item) => ({
    label: item,
    value: item
  }));

  return (
    <View style={styles.container}>

      <Text style={[styles.title, { color: colors.text }]}>
        Select Symptoms
      </Text>

      <MultiSelect
        data={symptomData}
        labelField="label"
        valueField="value"

        placeholder="Search symptoms..."
        search

        value={selected}

        /* updates immediately when clicked */
        onChange={(items) => setSelected(items)}

        /* IMPORTANT FIXES */
        //mode="modal"
        dropdownPosition="bottom"
        maxHeight={200}

        flatListProps={{
          nestedScrollEnabled: true
        }}

        style={[
          styles.dropdown,
          { backgroundColor: colors.card, borderColor: colors.border }
        ]}

        placeholderStyle={{ color: colors.textSecondary }}

        inputSearchStyle={styles.searchInput}

        selectedStyle={[
          styles.selectedItem,
          { backgroundColor: colors.primary }
        ]}

        selectedTextStyle={styles.selectedText}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10
  },

  dropdown: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12
  },

  searchInput: {
    height: 40,
    fontSize: 16
  },

  selectedItem: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6
  },

  selectedText: {
    color: "#fff",
    fontSize: 14
  }

});