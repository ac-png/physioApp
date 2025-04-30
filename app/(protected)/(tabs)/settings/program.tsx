import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { FormPageHeader } from 'components/FormPageHeader'

const Program = () => {
  return (
    <ScrollView>
        
        <FormPageHeader
            backPageName="Settings"
            backPageURI="settings"
            headerText="Program Settings"
            descriptionText=""
            descriptionVisible={false}
        />

    </ScrollView>
  )
}

export default Program