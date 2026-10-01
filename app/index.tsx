import { useState } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Clock3,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  YStack,
  XStack,
  ScrollView,
  SizableText,
  Button,
} from '@blinkdotnew/mobile-ui';

const GREEN = '#B7F36B';
const BG = '#101311';
const PANEL = '#191E1A';
const MUTED = '#89938B';
const STOCKS = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: '$142.68', change: '+2.84%', move: 2.84, volume: '3.2×', tag: 'Momentum', bars: [9, 13, 11, 17, 14, 20, 18, 24] },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: '$248.50', change: '+1.92%', move: 1.92, volume: '2.7×', tag: 'Momentum', bars: [12, 10, 15, 14, 18, 15, 22, 25] },
  { symbol: 'PLTR', name: 'Palantir Tech.', price: '$38.42', change: '+1.46%', move: 1.46, volume: '4.1×', tag: 'Volume', bars: [8, 11, 9, 14, 12, 19, 18, 23] },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: '$164.12', change: '+0.88%', move: 0.88, volume: '1.9×', tag: 'Volume', bars: [9, 12, 11, 16, 14, 17, 19, 21] },
  { symbol: 'AAPL', name: 'Apple Inc.', price: '$229.31', change: '+0.54%', move: 0.54, volume: '1.4×', tag: 'Momentum', bars: [10, 12, 9, 13, 15, 14, 18, 20] },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '$187.76', change: '−0.32%', move: -0.32, volume: '1.2×', tag: 'Volume', bars: [20, 17, 18, 15, 17, 13, 14, 11] },
];

export default function Home() {
  const [agentOn, setAgentOn] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState('NVDA');
  const [activity, setActivity] = useState('Your paper agent is standing by. No real orders will be placed.');
  const visibleStocks = STOCKS.filter((stock) => filter === 'All' || stock.tag === filter);
  const selectedStock = STOCKS.find((stock) => stock.symbol === selected) ?? STOCKS[0];

  const feedback = () => {
    if (Platform.OS !== 'web') Haptics.selectionAsync();
  };

  const toggleAgent = () => {
    feedback();
    const next = !agentOn;
    setAgentOn(next);
    setActivity(next
      ? `Paper agent started · Watching ${selectedStock.symbol} and 5 other setups.`
      : 'Paper agent paused · No real orders were placed.');
  };

  return (
    <YStack flex={1} backgroundColor={BG}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack width="100%" maxWidth={560} alignSelf="center" paddingHorizontal="$4" paddingTop="$5" paddingBottom="$8" gap="$5">
          <Animated.View entering={FadeInDown.duration(420)}>
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <YStack width={38} height={38} borderRadius={13} backgroundColor={GREEN} alignItems="center" justifyContent="center">
                  <Sparkles size={20} color={BG} strokeWidth={2.5} />
                </YStack>
                <YStack gap={1}>
                  <SizableText color="#F3F5F1" fontSize={17} fontWeight="700" letterSpacing={-0.4}>SHADOW</SizableText>
                  <SizableText color={MUTED} fontSize={11} letterSpacing={1.8}>FINANCE</SizableText>
                </YStack>
              </XStack>
              <XStack alignItems="center" gap="$2" backgroundColor="#1B241B" paddingHorizontal="$3" paddingVertical="$2" borderRadius={30}>
                <YStack width={7} height={7} borderRadius={4} backgroundColor={GREEN} />
                <SizableText color="#C3D0C2" fontSize={11} fontWeight="600">PAPER MODE</SizableText>
              </XStack>
            </XStack>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(80).duration(450)}>
            <YStack gap="$2">
              <SizableText color={MUTED} fontSize={12} fontWeight="600" letterSpacing={1.1}>THURSDAY · PRE-MARKET</SizableText>
              <SizableText color="#F4F5F2" fontSize={30} fontWeight="700" letterSpacing={-1.1}>Find the early edge.</SizableText>
              <SizableText color="#9AA39B" fontSize={14} lineHeight={21}>A simulated read on the names moving before the bell.</SizableText>
            </YStack>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(450)}>
            <YStack backgroundColor="#1C251D" borderColor="#334332" borderWidth={1} borderRadius={20} padding="$4" gap="$4">
              <XStack justifyContent="space-between" alignItems="flex-start">
                <XStack gap="$3" alignItems="center">
                  <YStack width={42} height={42} borderRadius={14} backgroundColor="#2A3829" alignItems="center" justifyContent="center">
                    <Bot size={21} color={GREEN} />
                  </YStack>
                  <YStack gap={3}>
                    <SizableText color="#EFF4EA" fontSize={16} fontWeight="700">Shadow agent</SizableText>
                    <XStack alignItems="center" gap="$2">
                      <YStack width={7} height={7} borderRadius={4} backgroundColor={agentOn ? GREEN : '#8C958C'} />
                      <SizableText color={agentOn ? GREEN : '#A3AAA2'} fontSize={12}>{agentOn ? 'Running · paper trading' : 'Ready to deploy'}</SizableText>
                    </XStack>
                  </YStack>
                </XStack>
                <ShieldCheck size={19} color="#84917F" />
              </XStack>
              <XStack backgroundColor="#151B16" borderRadius={12} padding="$3" gap="$2" alignItems="flex-start">
                <Clock3 size={15} color={GREEN} />
                <SizableText color="#AAB4A7" fontSize={12} lineHeight={18} flex={1}>{activity}</SizableText>
              </XStack>
              <Button onPress={toggleAgent} height={48} backgroundColor={agentOn ? '#303A30' : GREEN} borderRadius={13} pressStyle={{ opacity: 0.84, scale: 0.98 }}>
                <XStack alignItems="center" justifyContent="center" gap="$2">
                  {agentOn ? <Pause size={16} color="#F1F4EF" /> : <Play size={16} color={BG} fill={BG} />}
                  <SizableText color={agentOn ? '#F1F4EF' : BG} fontSize={14} fontWeight="700">{agentOn ? 'Pause paper agent' : 'Deploy paper agent'}</SizableText>
                </XStack>
              </Button>
              <SizableText color="#818A81" fontSize={11} textAlign="center">Simulation only · no brokerage connected</SizableText>
            </YStack>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(220).duration(450)}>
            <YStack backgroundColor={PANEL} borderColor="#272E28" borderWidth={1} borderRadius={20} padding="$4" gap="$4">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap={4}>
                  <SizableText color="#E9EDE7" fontSize={14} fontWeight="700">Market pulse</SizableText>
                  <SizableText color={MUTED} fontSize={11}>Illustrative pre-market snapshot</SizableText>
                </YStack>
                <XStack alignItems="center" gap="$1">
                  <SizableText color={GREEN} fontSize={12} fontWeight="700">S&P 500</SizableText>
                  <SizableText color="#DDE3DB" fontSize={12}>5,842.16</SizableText>
                  <ArrowUpRight size={14} color={GREEN} />
                </XStack>
              </XStack>
              <XStack gap="$2">
                <YStack flex={1} backgroundColor="#151A16" borderRadius={12} padding="$3" gap={5}>
                  <SizableText color={MUTED} fontSize={10}>NASDAQ</SizableText>
                  <SizableText color="#EFF2EC" fontSize={17} fontWeight="700">18,421</SizableText>
                  <SizableText color={GREEN} fontSize={11}>+0.74%</SizableText>
                </YStack>
                <YStack flex={1} backgroundColor="#151A16" borderRadius={12} padding="$3" gap={5}>
                  <SizableText color={MUTED} fontSize={10}>VIX</SizableText>
                  <SizableText color="#EFF2EC" fontSize={17} fontWeight="700">16.82</SizableText>
                  <SizableText color="#E5BC72" fontSize={11}>−2.1% · calm</SizableText>
                </YStack>
                <YStack flex={1} backgroundColor="#151A16" borderRadius={12} padding="$3" gap={5}>
                  <SizableText color={MUTED} fontSize={10}>TOP SETUP</SizableText>
                  <SizableText color="#EFF2EC" fontSize={17} fontWeight="700">NVDA</SizableText>
                  <SizableText color={GREEN} fontSize={11}>+2.84%</SizableText>
                </YStack>
              </XStack>
            </YStack>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(290).duration(450)}>
            <YStack gap="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap={3}>
                  <SizableText color="#EFF2EC" fontSize={17} fontWeight="700">Early movers</SizableText>
                  <SizableText color={MUTED} fontSize={11}>Selected pre-market watchlist</SizableText>
                </YStack>
                <XStack alignItems="center" gap="$1">
                  <SizableText color="#A0AAA0" fontSize={11}>View all</SizableText>
                  <ArrowRight size={13} color="#A0AAA0" />
                </XStack>
              </XStack>
              <XStack gap="$2">
                {['All', 'Momentum', 'Volume'].map((item) => (
                  <Button key={item} onPress={() => { feedback(); setFilter(item); }} height={34} paddingHorizontal="$3" borderRadius={22} backgroundColor={filter === item ? GREEN : PANEL} borderColor={filter === item ? GREEN : '#303730'} borderWidth={1} pressStyle={{ opacity: 0.8 }}>
                    <SizableText color={filter === item ? BG : '#AAB2AA'} fontSize={11} fontWeight="600">{item}</SizableText>
                  </Button>
                ))}
              </XStack>
              <YStack backgroundColor={PANEL} borderColor="#272E28" borderWidth={1} borderRadius={18} paddingHorizontal="$3">
                {visibleStocks.map((stock, index) => (
                  <YStack key={stock.symbol}>
                    {index > 0 && <YStack height={1} backgroundColor="#2A302B" />}
                    <Button onPress={() => { feedback(); setSelected(stock.symbol); }} backgroundColor="transparent" paddingHorizontal="$1" paddingVertical="$3" minHeight={68} pressStyle={{ opacity: 0.72, scale: 0.99 }}>
                      <XStack alignItems="center" justifyContent="space-between" width="100%">
                        <XStack alignItems="center" gap="$3">
                          <YStack width={38} height={38} borderRadius={12} backgroundColor={selected === stock.symbol ? '#33452E' : '#252B26'} alignItems="center" justifyContent="center">
                            <SizableText color={selected === stock.symbol ? GREEN : '#D6DDD5'} fontSize={11} fontWeight="700">{stock.symbol.slice(0, 2)}</SizableText>
                          </YStack>
                          <YStack gap={3}>
                            <SizableText color="#E9EDE7" fontSize={13} fontWeight="700">{stock.symbol}</SizableText>
                            <SizableText color={MUTED} fontSize={10}>{stock.name} · {stock.volume} vol</SizableText>
                          </YStack>
                        </XStack>
                        <XStack alignItems="center" gap="$3">
                          <XStack alignItems="flex-end" gap={2} height={25}>
                            {stock.bars.map((bar, barIndex) => <YStack key={barIndex} width={3} height={bar} borderRadius={2} backgroundColor={stock.move > 0 ? '#8FC94C' : '#C77A70'} />)}
                          </XStack>
                          <YStack alignItems="flex-end" gap={3} minWidth={65}>
                            <SizableText color="#E9EDE7" fontSize={12} fontWeight="600">{stock.price}</SizableText>
                            <XStack alignItems="center" gap={2}>
                              {stock.move >= 0 ? <ArrowUpRight size={12} color={GREEN} /> : <ArrowDownRight size={12} color="#D98A7F" />}
                              <SizableText color={stock.move >= 0 ? GREEN : '#D98A7F'} fontSize={11} fontWeight="600">{stock.change}</SizableText>
                            </XStack>
                          </YStack>
                        </XStack>
                      </XStack>
                    </Button>
                  </YStack>
                ))}
              </YStack>
            </YStack>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(360).duration(450)}>
            <YStack backgroundColor="#171D18" borderColor="#2B342C" borderWidth={1} borderRadius={18} padding="$4" gap="$3">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  <Sparkles size={15} color={GREEN} />
                  <SizableText color="#DCE5D8" fontSize={12} fontWeight="700">SETUP SNAPSHOT</SizableText>
                </XStack>
                <SizableText color="#849181" fontSize={10}>SIMULATED</SizableText>
              </XStack>
              <XStack justifyContent="space-between" alignItems="center">
                <YStack gap={3}>
                  <SizableText color="#F0F3EE" fontSize={20} fontWeight="700">{selectedStock.symbol}</SizableText>
                  <SizableText color="#9CA69A" fontSize={12}>Relative volume {selectedStock.volume}</SizableText>
                </YStack>
                <YStack backgroundColor="#293625" borderRadius={10} paddingHorizontal="$3" paddingVertical="$2">
                  <SizableText color={GREEN} fontSize={12} fontWeight="700">{selectedStock.change} pre-market</SizableText>
                </YStack>
              </XStack>
              <SizableText color="#A8B1A6" fontSize={12} lineHeight={18}>Watch the opening range for follow-through; elevated volume can reverse quickly. This is an illustrative setup, not a recommendation.</SizableText>
            </YStack>
          </Animated.View>
          <SizableText color="#69736A" fontSize={10} textAlign="center" lineHeight={16}>Market values shown are sample data for demonstration only. Shadow Finance does not provide investment advice.</SizableText>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
