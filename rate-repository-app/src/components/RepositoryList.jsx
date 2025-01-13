import { FlatList, View, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

export const RepositoryListContainer = ({ repositories, order, setOrder }) => {
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
      ListHeaderComponent={<OrderPicker order={order} setOrder={setOrder} />}
    />
  );
}

const RepositoryList = () => {
  const [order, setOrder] = useState("latest");
  const { repositories } = useRepositories({ order });

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
    />
  );
};

export default RepositoryList;
