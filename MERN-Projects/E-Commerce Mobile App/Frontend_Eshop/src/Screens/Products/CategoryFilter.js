import { TouchableOpacity, ScrollView, StyleSheet, View, Text, FlatList } from 'react-native'
import React from 'react'
import { HStack, Badge, Box } from 'native-base'

const CategoryFilter = (props) => {
    return (
        <ScrollView
            bounces={true}
            horizontal={true}
            style={{ backgroundColor: "#f2f2f2" }}
        >
            <HStack style={{ margin: 0, padding: 0, borderRadius: 0 }}>
                <TouchableOpacity
                    key={1}
                    onPress={() => {
                        props.CategoryFilter('all'), props.setActive(-1)
                    }}
                >
                    <Badge style={[styles.center, { margin: 5, borderRadius: 30 },
                    props.active == -1 ? styles.active : styles.inactive
                    ]}
                    >
                        <Text style={{ color: 'white' }}>
                            all
                        </Text>
                    </Badge>
                </TouchableOpacity>
                {/* {
                    props.categories.map((item) => {
                        <TouchableOpacity
                            key={item._id.$oid}
                            onPress={() => {
                                props.CategoryFilter(item._id),
                                    props.setActive(props.categories.indexOf(item))
                            }}
                        >
                            <Box>
                                <Badge style={[styles.center, { margin: 5, borderRadius: 30,backgroundColor: "green" },
                                props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                                ]}
                                >
                                    <View>
                                        <Text style={{ color: 'black',backgroundColor: 'green' }}>
                                            haha
                                            {console.log(item._id.$oid)}
                                        </Text>
                                    </View>

                                </Badge>
                            </Box>

                        </TouchableOpacity>
                    })
                } */}
                <View style={styles.listContainer}>
                    <FlatList

                        key={'#'}
                        horizontal
                        data={props.categories}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                key={item._id.$oid}
                                onPress={() => {
                                    props.CategoryFilter(item._id),
                                        props.setActive(props.categories.indexOf(item))
                                }}
                            >
                                <Box>
                                    <Badge style={[styles.center, { margin: 5, borderRadius: 30, backgroundColor: "green" },
                                    props.active == props.categories.indexOf(item) ? styles.active : styles.inactive
                                    ]}
                                    >
                                        <View>
                                            <Text style={{ color: 'white' }}>
                                                {item.name}
                                                {console.log(item._id.$oid)}
                                            </Text>
                                        </View>

                                    </Badge>
                                </Box>
                            </TouchableOpacity>

                        }
                        keyExtractor={(item) => item.brand}
                    />
                </View>
            </HStack>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }, active: {
        backgroundColor: "#03bafc"
    }, inactive: {
        backgroundColor: "#a0e1eb"
    }
})

export default CategoryFilter