import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './app/i18n/request.ts'  // 경로 지정
);

let userConfig = undefined
try {
  userConfig = await import('./next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

// next-intl이 middleware를 통해 작동하므로 
// 기존 i18n 설정은 제거하거나 주석 처리해야 할 수 있습니다

export default withNextIntl(nextConfig);
