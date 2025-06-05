import { FlatList, View, Pressable, StyleSheet, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from "use-debounce";
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Text from './Text';

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
  messageContainer: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
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

export const RepositoryListContainer = ({
  repositories,
  onEndReach,
  order,
  setOrder,
  setSearchKeyword
}) => {
  const navigate = useNavigate();

  if (!repositories || repositories.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text>No repositories added.</Text>
      </View>
    )
  }

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
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { repositories, fetchMore } = useRepositories({ first: 6, order, searchKeyword });

  const onEndReach = () => {
    // console.log("End of list reached");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onEndReach={onEndReach}
      order={order}
      setOrder={setOrder}
      setSearchKeyword = {setSearchKeyword}
    />
  );
};

export default RepositoryList;
