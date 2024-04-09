# Install transformers from source - only needed for versions <= v4.34
# pip install git+https://github.com/huggingface/transformers.git
# pip install accelerate

import torch
from transformers import pipeline

def advisor(prompt):
    pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="auto")
    """Generates a response to the given prompt using Hugging Face's text-generation capabilities."""
    messages = [
    {
        "role": "system",
        "content": "You are a friendly chatbot who always responds in a slightly professional manner.",
    },
    {"role": "user", "content": prompt},]
    #Tokenizes the message so that the model can understand it  and generate an appropriate response.
    prompt2 = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt2, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    print(outputs[0]["generated_text"])

    return outputs[0]["generated_text"]
