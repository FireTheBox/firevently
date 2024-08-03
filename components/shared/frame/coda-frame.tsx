interface CodaFrameProps {
  embedUrl: string;
}

export const CodaFrame = ({ embedUrl }: CodaFrameProps) => {
    const [endpoint, _] = embedUrl.split("?");
    const src = `${endpoint}?viewMode=embedplay&hideSections=true`

    return (
    <div className="my-16 w-full overflow-hidden rounded-2xl">
      <iframe
        src={src}
        className="h-screen w-full"
        allow="fullscreen"
      ></iframe>
    </div>
  );
};
