import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 100,
  },
  button: {
    backgroundColor: '#4e9bde',
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  podo: {
    position: 'absolute',
    width: 117,
    height: 40,
    left: 137,
    top: 124,
    fontWeight: '800',
    fontSize: 40,
    lineHeight: 50,
    textAlign: 'center',
    letterSpacing: 0.59,
    color: '#3BCDA1',
  },
  postDonation: {
    position: 'absolute',
    width: 120,
    height: 22,
    left: 135,
    top: 165,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: 0.59,
    color: '#3BCDA1',
  },
  // 나머지 스타일들도 동일한 패턴으로 추가
});

export default styles;
