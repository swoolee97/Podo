import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 11,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    height: 45,
    backgroundColor: '#F4F4F4',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 8,
  },
  emailInput: {
    position: 'absolute',
    height: 45,
    left: '2.56%', // 리액트 네이티브에서는 백분율로 위치를 지정할 수 있습니다.
    right: '2.56%',
    top: 246,
    backgroundColor: '#F4F4F4',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },

  button: {
    height: 50,
    left: '0%',
    backgroundColor: '#3BCDA1',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 5,
  },

  loginButton: {
    height: 45,
    left: '2.56%',
    right: '2.56%',
    backgroundColor: '#3BCDA1',
    borderRadius: 8,
    justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
    alignItems: 'center', // 텍스트를 가로로 중앙에 위치시키기 위해 추가
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
  emailtext: {
    position: 'absolute',
    left: '3.33%',
    top: 223,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },

  passwordtext: {
    position: 'absolute',
    left: '3.33%',
    top: 306,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },

  passwordInput: {
    position: 'absolute',
    height: 45,
    left: '2.56%', // 리액트 네이티브에서는 백분율로 위치를 지정할 수 있습니다.
    right: '2.56%',
    top: 329,
    backgroundColor: '#F4F4F4',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
  },
  loginbox: {
    position: 'absolute',
    width: 370,
    height: 45,
    top: 412,
    opacity: 0.5,
  },

  loginText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  registerText: {
    position: 'absolute',
    left: '3.33%',
    top: 477,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },
  kakaoButton: {
    position: 'absolute',
    width: 370,
    height: 45,
    top: 532,
  },
  kakaoButton2: {
    height: 45,
    left: '2.56%',
    right: '2.56%',
    backgroundColor: '#FEE500',
    borderRadius: 8,
    alignItems: 'center', // 센터 정렬
    justifyContent: 'center', // 센터 정렬
  },
  kakaoText: {
    top: -1.5,
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    color: '#000000',
  },
  kakaoIcon: {
    width: 16,
    height: 15,
    position: 'absolute',
    left: 136,
    top: 15,
  },
  passwordText: {
    position: 'absolute',
    right: '2.56%',
    top: 477,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: '#000000',
  },

  Setpassword: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3BCDA1',
  },

  // 나머지 스타일들도 동일한 패턴으로 추가
});

export default styles;
