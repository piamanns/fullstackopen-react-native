import { FlatList, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from "use-debounce";
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    margin: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.bgSearch,
    padding: 10,
    borderRadius: 4,
  },
  textInput: {
    flex: 1
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SearchField = ({ setSearchKeyword }) => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 500);

  useEffect(() => {
    setSearchKeyword(debouncedValue);
  }, [debouncedValue]);

  const clearTextInput = () => {
    setValue("")
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        value={value}
        onChangeText= {text => {
          setValue(text)
        }}
      />
      <Pressable
        onPress={clearTextInput}
        style={({pressed}) => [
          {opacity: pressed ? 0.5 : 1}

        ]}
      >
        <AntDesign name="close" size={24}/>
      </Pressable>
    </View>
  )
}

const OrderPicker = ({ order, setOrder }) => {
  return (
    <Picker
      selectedValue={order}
      onValueChange={(itemValue) =>
        setOrder(itemValue)
      }
      prompt="Select sorting order:"
      >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  )
}

const ListHeader = ({ order, setOrder, setSearchKeyword }) => {
  return (
    <View style={styles.headerContainer}>
      <SearchField setSearchKeyword={setSearchKeyword}/>
      <OrderPicker order={order} setOrder={setOrder} />
    </View>
  )
}

export const RepositoryListContainer = ({ repositories, order, setOrder, setSearchKeyword }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const openRepoView = (repoId) => {
    navigate(`/${repoId}`);
  }

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <Pressable onPress={() => openRepoView(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      ListHeaderComponent={
        <ListHeader
          order={order}
          setOrder={setOrder}
          setSearchKeyword={setSearchKeyword}
        />
      }
    />
  );
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { repositories } = useRepositories({ order, searchKeyword });

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      setSearchKeyword = {setSearchKeyword}
    />
  );
};

export default RepositoryList;
