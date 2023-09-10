import { Component, ErrorInfo, ReactNode } from 'react';
import { APIError } from '../api/common';

type Props = {
  children?: ReactNode;
};

type ServiceError = Error | APIError | null;

type State = {
  hasError: boolean;
  info: ServiceError;
};

class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      info: null,
    };
  }

  static getDerivedStateFromError(error: ServiceError) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, info: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('error: ', error);
    console.log('errorInfo: ', errorInfo);
  }

  render() {
    const { hasError, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      if (info instanceof APIError && info.code === 1300) {
        return (
          <div>
            <div>500 Server Error</div>
            <a href="/">홈으로 이동하기</a>
          </div>
        );
      } else {
        alert(info?.message);
      }
    }

    return children;
  }
}

export default CustomErrorBoundary;
