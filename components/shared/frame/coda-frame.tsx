interface CodaFrameProps {
  embedUrl: string;
}

export const CodaFrame = ({ embedUrl }: CodaFrameProps) => {
    const [endpoint, _] = embedUrl.split("?");
    const src = `${endpoint}?viewMode=embedplay&hideSections=true`

    return (
    <div className="w-full rounded-2xl overflow-hidden my-16">
      <iframe
        src={src}
        className="w-full h-screen"
        allow="fullscreen"
      ></iframe>
    </div>
  );
};
