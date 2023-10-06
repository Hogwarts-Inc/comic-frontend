import { useRouter } from 'next/router';

export type Visualizer = {
  chapter: number;
  vignette: number;
};

export default function Page() {
  const route = useRouter();
  const { chapter, vignette } = route.query;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
      }}>
      <div>Capitulo: {chapter}</div>
      <div>Viñeta: {vignette}</div>
    </div>
  );
}
