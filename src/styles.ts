import { StyleSheet } from "react-native";

export const SeitySimpleDatePickerStyles = StyleSheet.create({
    input: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: "#577C7D",
        borderRadius: 25,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inputText: {
        fontSize: 16,
        color: "#52625F",
    },
    inputArrow: {
        color: "#6EA1A2",
        fontWeight: '100',
        fontSize: 40,
        position: 'absolute',
        bottom: -40,
        right: -40
    },
    modal: {
        height: 300,
        position: 'absolute',
        width: '100%',
        top: 25,
        zIndex: 999,
        elevation: 9,
        borderRadius: 20,
        paddingBottom: 12,
        backgroundColor: "#FFF",
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderColor: '#577C7D',
        borderTopEndRadius: 0,
        borderTopLeftRadius: 0,
        left: 2
    },
    inputLabelContainer: { 
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    inputLabel: {
        fontSize: 18,
        marginLeft: 0,
        padding: 16,
        paddingRight: 8,
        paddingBottom: 8
    },
    inputCaret: {
        alignItems: 'flex-end',
        position: 'absolute',
        right: -5
    },
    inputItem:{
        width: '100%',
        height: 40,
        justifyContent:'center',
        alignItems:'center'
    },
    inputItemText:{
        fontSize:20,
    }
})

export default SeitySimpleDatePickerStyles;