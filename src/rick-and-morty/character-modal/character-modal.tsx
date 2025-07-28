import { Flex, Image, Modal } from 'antd'
import './character-modal.css'
import { useTypedSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { selectCharacterDetails } from '../../redux/actions'

function CharacterModal() {
  const dispatch = useDispatch()
  const character = useTypedSelector((state) => {
    return state.characters.find((c) => c.id === state.onModal) || null
  })

  return (
    <Modal
      open={!!character}
      className="modal"
      footer={null}
      onCancel={() => {
        dispatch(selectCharacterDetails(null))
      }}
    >
      <Flex gap={16}>
        <Image src={character?.image} alt={character?.name} />
        <h1>{character?.name}</h1>
      </Flex>
    </Modal>
  )
}

export default CharacterModal
