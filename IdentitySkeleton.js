import React from 'react';
import { View } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {LIST_ITEM_HEIGHT} from '../config'

export const IdentitySkeleton = ({loading}) => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const color = ['#36454F', '#808080', '#5A5A5A']
        let data = [1, 2, 3, 4]
        return (
            <>
                {data.map((index) => {
                    return (
                        <View key={index} style={{  flexDirection: 'row', width: '100%', height: LIST_ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 2, padding: 16 }}>
                                <View style={{ flex: 3 }}>
                                    <ShimmerPlaceholder visible={!loading} shimmerStyle={{ width: '60%', height: 15, marginVertical: 5, borderRadius: 5 }} shimmerColors={color} />
                                    <ShimmerPlaceholder visible={!loading} shimmerStyle={{ width: '100%', height: 15, marginVertical: 5, borderRadius: 5 }} shimmerColors={color} />
                                </View>
                            </View>
                        </View>
                    )
                })}
            </>
        )
    }
